import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies.access_token;
    const fly_id = req.query.fly_id;
    if (!token) {
      return res.status(400).json({ message: "Token is missing in request" });
    }

    if (!fly_id) {
      return res.status(400).json({ message: "Fly id is missing in request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      uuid: string;
    };

    const user_id = decoded.uuid;

    if (!user_id)
      return res.status(400).json({ message: "Missing user id in payload" });
    const isUser = await prisma.user.findUnique({
      where: {
        uuid: user_id,
      },
    });

    if (!isUser) return res.status(400).json({ message: "Invalid user id" });

    const fly = await prisma.fly.findFirst({
      where: {
        uuid: fly_id as string,
        user_id: user_id,
      },
    });
    if (!fly) return res.status(400).json({ message: "Invalid fly id" });

    return res.status(200).json([
      { date: "2023-06-21", count: 10 },
      { date: "2023-06-22", count: 90 },
      { date: "2023-06-23", count: 100 },
      { date: "2023-06-24", count: 30 },
      { date: "2023-06-25", count: 47 },
      { date: "2023-06-26", count: 5 },
    ]);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(handler);
