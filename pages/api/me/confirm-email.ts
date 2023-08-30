import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.body.token;

    if (!token)
      return res.status(400).json({ message: "Missing token in request" });

    const emailRecord = await prisma.emailReset.findUnique({
      where: {
        uuid: token,
      },
    });

    if (!emailRecord) return res.status(400).json({ message: "Invalid token" });

    await prisma.emailReset.update({
      where: {
        uuid: token,
      },
      data: {
        is_verified: true,
      },
    });

    res.status(200).json({ message: "Email has been confirmed" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
