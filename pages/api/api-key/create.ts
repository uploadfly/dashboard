import prisma from "@/prisma";
import { generateApiKey } from "@/utils/generateApiKey";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { fly_id } = req.body;

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ message: "Token is missing in request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      uuid: string;
    };
    const user_id = decoded.uuid;

    if (!user_id || !fly_id)
      return res.status(400).json({ message: "Missing user or fly id" });
    const user = await prisma.user.findUnique({
      where: {
        uuid: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid user id" });
    }

    const fly = await prisma.fly.findUnique({
      where: {
        uuid: fly_id,
      },
    });

    if (!fly) {
      return res.status(404).json({ message: "Invalid Fly id" });
    }

    const public_key = generateApiKey();
    const secret_key = generateApiKey();

    await prisma.apiKey.create({
      data: {
        public_key: `pk_${public_key}`,
        secret_key: `sk_${secret_key}`,
        user_id,
        fly_id,
      },
    });

    return res
      .status(201)
      .json({
        message: "API has been created",
        keys: { public_key, secret_key },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["POST"])(handler);
