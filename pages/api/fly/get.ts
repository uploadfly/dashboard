import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fly_name, username } = req.query as {
    fly_name: string;
    username: string;
  };

  if (!fly_name) {
    res.status(400).json({
      message: "Missing fly name",
    });
    return;
  }

  if (!username) {
    res.status(400).json({
      message: "Missing username",
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

  if (user.username !== username) {
    return res.status(404).json({ message: "Invalid username" });
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

  res.status(200).json({
    id: fly.id,
    name: fly.name,
    plan: fly.plan,
    paused: fly.paused,
  });
};

export default withErrorHandling(withAuth(handler), ["GET"]);
