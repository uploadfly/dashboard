import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id;

  if (!fly_id) {
    return res.status(400).json({ message: "Fly id is missing in request" });
  }

  const fly = await prisma.fly.findFirst({
    where: {
      id: fly_id as string,
      user_id: req.user.id,
    },
  });

  if (!fly) return res.status(400).json({ message: "Invalid fly id" });

  const totalFiles = await prisma.file.aggregate({
    where: {
      fly_id: fly.id,
    },
    _count: true,
  });

  res.status(200).json({
    files: totalFiles._count,
    size: Number(fly.used_storage),
  });
};

export default withErrorHandling(withAuth(handler), ["GET"]);
