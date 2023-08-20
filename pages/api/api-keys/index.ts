import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const { fly_name } = req.query as { fly_name: string };

    if (!fly_name) {
      res.status(400).json({
        message: "Missing fly name",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        uuid: req.user.uuid,
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

    const apiKeys = await prisma.apikey.findMany({
      where: {
        fly_id: fly.uuid,
      },
      select: {
        uuid: true,
        key: true,
        permission: true,
        created_at: true,
        name: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    const apiKeysWithTruncatedKeys = apiKeys.map((key) => {
      return {
        ...key,
        key: key.key.substring(0, 10) + "...",
      };
    });
    res.status(200).json(apiKeysWithTruncatedKeys);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
