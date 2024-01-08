import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import { generateApiKey } from "@/utils/generateApiKey";
import axios from "axios";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const event = req.body.meta.event_name as
    | "subscription_created"
    | "subscription_cancelled"
    | "subscription_paused"
    | "subscription_unpaused"
    | "subscription_resumed"
    | "subscription_expired";

  const userEmail = req.body.data.user_email;
  const customerId = req.body.data.customer_id;
  const userId = req.body.meta.custom_data.user_id;
  const projectId = req.body.meta.custom_data.project_id;

  console.log(req.body);

  try {
    const project = await prisma.fly.findUnique({
      where: {
        id: projectId,
      },
    });

    const isUsedStorageLessThan2GB = Number(project?.used_storage) < 2000000000;

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
