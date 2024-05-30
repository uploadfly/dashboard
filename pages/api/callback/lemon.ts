import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import { NextApiRequest, NextApiResponse } from "next";
import { nodejsWebHookHandler } from "@/lib/validateWebhook";
import { LogSnag } from "@logsnag/next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_TOKEN!,
  project: process.env.LOGSNAG_PROJECT!,
});

const plans = [
  {
    name: "basic",
    id: process.env.BASIC_PLAN_ID,
    storage: 20000000000,
    price: 5,
  },
  {
    name: "pro",
    id: process.env.PRO_PLAN_ID,
    storage: 100000000000,
    price: 20,
  },
];

enum project_plan {
  free = "free",
  basic = "basic",
  pro = "pro",
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lemon_secret = process.env.LEMON_SECRET as string;

  try {
    await nodejsWebHookHandler({
      async onData(payload) {
        const event_name = payload.event_name as
          | "subscription_created"
          | "subscription_cancelled"
          | "subscription_payment_success"
          | "subscription_updated"
          | "subscription_paused"
          | "subscription_unpaused"
          | "subscription_resumed"
          | "subscription_expired";

        const selectedPlan = plans.find(
          (plan) => plan.id === String(payload.data.attributes.product_id)
        );

        const customData = {
          userId: payload.meta.custom_data.user_id,
          projectId: payload.meta.custom_data.project_id,
        };
        const customerId = payload.data.attributes.customer_id;

        const project = await prisma.fly.findUnique({
          where: {
            id: customData.projectId,
          },
        });

        const user = await prisma.user.findUnique({
          where: {
            id: customData.userId,
          },
        });

        if (user?.lemon_customer_id === null) {
          await prisma.user.update({
            where: {
              id: customData.userId,
            },
            data: {
              lemon_customer_id: String(customerId),
            },
          });
        }

        switch (event_name) {
          case "subscription_created":
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
                ),
              },
            });

            await logsnag.track({
              channel: "subcriptions",
              event: "New subscription",
              user_id: customData.userId,
              description: `$${selectedPlan?.price}/m ${selectedPlan?.name} plan`,
              icon: "💰",
              notify: true,
            });

            break;

          case "subscription_cancelled":
            await prisma.fly.update({
              where: {
                id: project?.id,
              },
              data: {
                paused: true,
                paused_at: new Date(),
              },
            });
            break;

          case "subscription_payment_success":
            await logsnag.track({
              channel: "subcriptions",
              event: "Subscription renewal",
              user_id: customData.userId,
              icon: "💰",
              notify: true,
            });
            break;

          case "subscription_updated":
            // Tf am I supposed to do here???!!!
            break;

          case "subscription_paused":
            await prisma.fly.update({
              where: {
                id: project?.id,
              },
              data: {
                paused: true,
                paused_at: new Date(),
              },
            });
            break;

          case "subscription_unpaused":
            await prisma.fly.update({
              where: {
                id: project?.id,
              },
              data: {
                paused: false,
                paused_at: null,
              },
            });
            break;

          case "subscription_resumed":
            await prisma.fly.update({
              where: {
                id: project?.id,
              },
              data: {
                paused: false,
                paused_at: null,
              },
            });
            break;

          case "subscription_expired":
            await deleteAllFiles({
              projectId: customData.projectId,
              userId: customData.userId,
            });
            break;

          default:
            break;
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
