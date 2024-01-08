import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const event = req.body.meta.event_name as
    | "subscription_created"
    | "subscription_cancelled"
    | "subscription_resumed"
    | "subscription_expired"
    | "subscription_paused"
    | "subscription_unpaused"
    | "subscription_payment_failed";

  const userEmail = req.body.data.user_email;
  const customerId = req.body.data.customer_id;
  const userId = req.body.meta.custom_data.user_id;
  const projectId = req.body.meta.custom_data.project_id;

  console.log(req.body);

  try {
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
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

export default handler;
