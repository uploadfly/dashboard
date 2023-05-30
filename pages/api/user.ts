import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies.access_token;

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    ) as {
      uuid: string;
    };

    const uuid = decoded.uuid;

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
      select: {
        username: true,
        email: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
    console.log(error);
  }
};

export default allowMethods(["GET"])(handler);
