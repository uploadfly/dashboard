import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

interface FileUploadAnalytics {
  date: string;
  count: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id;

  if (!fly_id) {
    return res.status(400).json({ message: "Fly id is missing in request" });
  }

  const isUser = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!isUser) return res.status(400).json({ message: "Invalid user id" });

  const fly = await prisma.fly.findFirst({
    where: {
      id: fly_id as string,
      user_id: req.user.id,
    },
  });
  if (!fly) return res.status(400).json({ message: "Invalid fly id" });

  const fileUploads = await prisma.file.groupBy({
    by: ["date"],
    _count: { date: true },
    where: {
      fly_id: fly?.id,
    },
  });

  const fileUploadAnalytics: FileUploadAnalytics[] = fileUploads.map(
    (item: { date: string; _count: { date: number } }) => ({
      date: item.date,
      count: item._count.date,
    })
  );

  return res.status(200).json(fileUploadAnalytics);
};

export default withErrorHandling(withAuth(handler), ["GET"]);
