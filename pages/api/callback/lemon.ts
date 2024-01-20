import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { nodejsWebHookHandler } from "@/lib/validateWebhook";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const customerId = req.body.data.customer_id;
  const userId = req.body.meta.custom_data.user_id;
  const projectId = req.body.meta.custom_data.project_id;

  try {
    const project = await prisma.fly.findUnique({
      where: {
        id: projectId,
      },
    });

    const lemon_secret = process.env.LEMON_SECRET as string;
    await nodejsWebHookHandler({
      async onData(payload) {
        console.log(payload);
        if (payload.event_name === "subscription_created") {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              lemon_customer_id: customerId,
            },
          });

          await prisma.fly.update({
            where: {
              id: project?.id,
            },
            data: {
              plan: "pro",
              storage: 100000000000,
              lemon_subcription_id: String(payload.data.id),
              lemon_subcription_created_at: new Date(
                payload.data.attributes.created_at
              ),
              lemon_subcription_renews_at: new Date(
                payload.data.attributes.renews_at
              ),
            },
          });

          return res.status(200).json({ message: "Subscription created" });
        }

        if (payload.event_name === "subscription_updated") {
          await prisma.fly.update({
            where: {
              id: projectId,
            },
            data: {
              lemon_subcription_renews_at: new Date(
                payload.data.attributes.renews_at
              ),
            },
          });
          return res.status(200).json({ message: "Subscription updated" });
        }

        if (payload.event_name === "subscription_paused") {
          await prisma.fly.update({
            where: {
              id: projectId,
            },
            data: {
              paused: true,
              paused_at: dayjs().toDate(),
            },
          });
          return res
            .status(200)
            .json({ message: "Subscription has been paused" });
        }

        if (payload.event_name === "subscription_unpaused") {
          await prisma.fly.update({
            where: {
              id: projectId,
            },
            data: {
              paused: false,
              paused_at: null,
            },
          });
          return res
            .status(200)
            .json({ message: "Subscription has been resumed" });
        }

        if (payload.event_name === "subscription_expired") {
          await deleteAllFiles({
            projectId,
            userId,
          });
        }
      },
      req,
      res,
      secret: lemon_secret,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

export default handler;
