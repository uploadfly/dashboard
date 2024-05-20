import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id;

  if (!fly_id) {
    res.status(400).json({
      message: "Fly ID is missing in request",
    });
    return;
  }

  const fly = await prisma.fly.findUnique({
    where: {
      id: fly_id as string,
    },
  });

  if (!fly) {
    res.status(400).json({
      message: "Invalid fly ID",
    });
    return;
  }

  if (fly.user_id !== req.user.id) {
    res.status(400).json({
      message: "Invalid fly ID",
    });
    return;
  }

  const files = await prisma.file.findMany({
    where: {
      fly_id: fly.id,
    },
    select: {
      path: true,
      size: true,
      url: true,
      created_at: true,
      name: true,
      type: true,
      uploaded_via: true,
    },
  });

  const filesWithSizeAsNumber = files.map((file: any) => ({
    ...file,
    size: Number(file.size),
  }));

  res.status(200).json({
    message: "Files retrieved successfully",
    files: filesWithSizeAsNumber,
  });
};

export default withErrorHandling(withAuth(handler), ["GET"]);
