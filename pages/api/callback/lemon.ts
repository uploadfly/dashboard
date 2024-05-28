import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { nodejsWebHookHandler } from "@/lib/validateWebhook";

export const config = {
  api: {
    bodyParser: false,
  },
};

const plans = [
  { name: "basic", id: process.env.BASIC_PLAN_ID, storage: 20000000000 },
  { name: "pro", id: process.env.PRO_PLAN_ID, storage: 100000000000 },
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lemon_secret = process.env.LEMON_SECRET as string;

  try {
    await nodejsWebHookHandler({
      async onData(payload) {
        const userId = payload.meta.custom_data.user_id;
        const projectId = payload.meta.custom_data.project_id;

        const project = await prisma.fly.findUnique({
          where: {
            id: projectId,
          },
        });

        let responseMessage = "";

        if (payload.event_name === "subscription_created") {
          const customerId = payload.data.attributes.customer_id;
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              lemon_customer_id: String(customerId),
            },
          });

          const selectedPlan = plans.find(
            (plan) => plan.id === String(payload.data.attributes.product_id)
          );

          enum project_plan {
            free = "free",
            basic = "basic",
            pro = "pro",
          }

          await prisma.fly.update({
            where: {
              id: project?.id,
            },
            data: {
              plan: selectedPlan?.name as project_plan,
              storage: selectedPlan?.storage,
              lemon_subcription_id: String(payload.data.id),
              lemon_subcription_created_at: new Date(
                payload.data.attributes.created_at
              ),
              lemon_subcription_renews_at: new Date(
                payload.data.attributes.renews_at
              )
            },
          });

          responseMessage = "Subscription created";
        } else if (payload.event_name === "subscription_updated") {
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
          responseMessage = "Subscription updated";
        } else if (payload.event_name === "subscription_paused") {
          await prisma.fly.update({
            where: {
              id: projectId,
            },
            data: {
              paused: true,
              paused_at: dayjs().toDate(),
            },
          });
          responseMessage = "Subscription has been paused";
        } else if (payload.event_name === "subscription_unpaused") {
          await prisma.fly.update({
            where: {
              id: projectId,
            },
            data: {
              paused: false,
              paused_at: null,
            },
          });
          responseMessage = "Subscription has been resumed";
        } else if (payload.event_name === "subscription_expired") {
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
  }
};

export default handler;
