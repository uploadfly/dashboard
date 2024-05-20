import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";
import { UserModel } from "@/interfaces";

const withAuth =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Token is missing in request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
    };

    const user_id = decoded.id;

    if (!user_id)
      return res.status(400).json({ message: "Missing user id in payload" });

    const user = (await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    })) as UserModel;

    req.user = user;

    return await handler(req, res);
  };

export default withAuth;
