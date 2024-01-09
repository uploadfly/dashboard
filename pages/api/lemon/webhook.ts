import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const event = req.body.meta.event_name as
    | "subscription_created"
    | "subscription_paused"
    | "subscription_unpaused"
    | "subscription_resumed"
    | "subscription_cancelled"
    | "subscription_expired";

  const signature = req.headers["x-signature"];

  if (!signature) {
    res.status(401).json({ message: "No signature found" });
    return;
  }

  const secret = process.env.LEMON_SECRET;

  // Validate the webhook signature
  const payload = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac("sha256", secret!)
    .update(payload)
    .digest("hex");

  const receivedSignature = Array.isArray(signature)
    ? Buffer.from(signature.join(""), "utf8")
    : Buffer.from(signature, "utf8");

  const calculatedSignature = Buffer.from(expectedSignature, "utf8");

  if (!crypto.timingSafeEqual(receivedSignature, calculatedSignature)) {
    console.log("Signature mismatch");
    res.status(401).json({ message: "Invalid signature" });
    return;
  }

  const customerId = req.body.data.customer_id;
  const userId = req.body.meta.custom_data.user_id;
  const projectId = req.body.meta.custom_data.project_id;

  try {
    const project = await prisma.fly.findUnique({
      where: {
        id: projectId,
      },
    });

    if (event === "subscription_created") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          lemon_customer_id: customerId,
        },
      });

      const project = await prisma.fly.findUnique({
        where: {
          id: projectId,
        },
      });

      await prisma.fly.update({
        where: {
          id: project?.id,
        },
        data: {
          plan: "pro",
          storage: 100000000000,
        },
      });

      res.status(200).json({ message: "Subscription created" });
      return;
    }

    if (event === "subscription_paused") {
      await prisma.fly.update({
        where: {
          id: projectId,
        },
        data: {
          paused: true,
          paused_at: dayjs().toDate(),
        },
      });
      return res.status(200).json({ message: "Subscription has been paused" });
    }

    if (event === "subscription_unpaused") {
      await prisma.fly.update({
        where: {
          id: projectId,
        },
        data: {
          paused: false,
          paused_at: null,
        },
      });
      return res.status(200).json({ message: "Subscription has been resumed" });
    }

    if (event === "subscription_expired") {
      await deleteAllFiles({
        projectId,
        userId,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

export default handler;
