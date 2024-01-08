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

  if (event === "subscription_created") {
  }
};

export default handler;
