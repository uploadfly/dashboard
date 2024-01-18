import prisma from "@/prisma";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
      try {
        const { data } = await axios.patch(
          `https://api.lemonsqueezy.com/v1/customers/${user?.lemon_customer_id}`,
          {
            data: {
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
        console.log(data);
      } catch (error: any) {
        console.log(error.response);
      }
    }

    res.status(200).json({ message: "Email has been confirmed" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["POST"])(handler);
