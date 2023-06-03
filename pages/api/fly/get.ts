import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { fly_name } = req.query as { fly_name: string };

    if (!fly_name) {
      res.status(400).json({
        message: "Missing fly name",
      });
      return;
    }

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ message: "Token is missing in request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      uuid: string;
    };
    const user_id = decoded.uuid;

    const user = await prisma.user.findUnique({
      where: {
        uuid: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid user id" });
    }

    const fly = await prisma.fly.findFirst({
      where: {
        name: fly_name,
        user_id: user.uuid,
      },
    });

    if (!fly) {
      return res.status(404).json({ message: "Fly not found" });
    }

    res.status(200).json({
      name: fly.name,
      uuid: fly.uuid,
      fly_name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["GET"])(handler);
