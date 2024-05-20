import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id as string;

  if (!fly_id) {
    res.status(400).json({
      message: "Fly ID is missing in request",
    });
    return;
  }

  const fly = await prisma.fly.findUnique({
    where: {
      id: fly_id,
    },
  });

  if (!fly) {
    res.status(404).json({
      message: "Fly not found",
    });
    return;
  }

  const logs = await prisma.log.findMany({
    where: {
      fly_id: fly.id,
    },
    select: {
      id: true,
      created_at: true,
      endpoint: true,
      method: true,
      status: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  res.status(200).json(logs);
};

export default withErrorHandling(withAuth(handler), ["GET"]);
