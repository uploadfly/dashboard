import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fly_name } = req.query as { fly_name: string };

  if (!fly_name) {
    res.status(400).json({
      message: "Missing fly name",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid user id" });
  }

  const fly = await prisma.fly.findFirst({
    where: {
      name: fly_name,
      user_id: user.id,
    },
  });

  if (!fly) {
    return res.status(404).json({ message: "Fly not found" });
  }

  const apiKeys = await prisma.apikey.findMany({
    where: {
      fly_id: fly.id,
    },
    select: {
      id: true,
      key: true,
      permission: true,
      created_at: true,
      name: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  const apiKeysWithTruncatedKeys = apiKeys.map((key: any) => {
    return {
      ...key,
      key: key.key.substring(0, 10) + "...",
    };
  });
  res.status(200).json(apiKeysWithTruncatedKeys);
};

export default withErrorHandling(withAuth(handler), ["GET"]);
