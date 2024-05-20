import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.body.token;

  if (!token)
    return res.status(400).json({ message: "Missing token in request" });

  const emailRecord = await prisma.emailReset.findUnique({
    where: {
      id: token,
    },
  });

  if (!emailRecord) return res.status(400).json({ message: "Invalid token" });

  if (emailRecord.is_verified)
    return res.status(400).json({ message: "Email already confirmed" });

  await prisma.emailReset.update({
    where: {
      id: token,
    },
    data: {
      is_verified: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: emailRecord.user_id,
    },
  });

  await prisma.user.update({
    where: {
      id: emailRecord.user_id,
    },
    data: {
      email: emailRecord.email,
    },
  });

  if (user?.lemon_customer_id) {
    await axios.patch(
      `https://api.lemonsqueezy.com/v1/customers/${user?.lemon_customer_id}`,
      {
        data: {
          type: "customers",
          id: user?.lemon_customer_id,
          attributes: {
            email: emailRecord.email,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
        },
      }
    );
  }

  res.status(200).json({ message: "Email has been confirmed" });
};

export default withErrorHandling(handler, ["POST"]);
