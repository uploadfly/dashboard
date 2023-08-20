import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

interface FileUploadAnalytics {
  date: string;
  count: number;
}

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const fly_id = req.query.fly_id;

    if (!fly_id) {
      return res.status(400).json({ message: "Fly id is missing in request" });
    }

    const isUser = await prisma.user.findUnique({
      where: {
        uuid: req.user.uuid,
      },
    });

    if (!isUser) return res.status(400).json({ message: "Invalid user id" });

    const fly = await prisma.fly.findFirst({
      where: {
        uuid: fly_id as string,
        user_id: req.user.uuid,
      },
    });
    if (!fly) return res.status(400).json({ message: "Invalid fly id" });

    const fileUploads = await prisma.file.groupBy({
      by: ["date"],
      _count: { date: true },
      where: {
        fly_id: fly?.uuid,
      },
    });

    const fileUploadAnalytics: FileUploadAnalytics[] = fileUploads.map(
      (item) => ({
        date: item.date,
        count: item._count.date,
      })
    );

    return res.status(200).json(fileUploadAnalytics);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
