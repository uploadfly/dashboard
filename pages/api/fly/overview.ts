import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import dayjs from "dayjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fly_id = req.query.fly_id;

    if (!fly_id) {
      res.status(400).json({ message: "Fly id is missing in request" });
      return;
    }

    const fly = await prisma.fly.findFirst({
      where: {
        id: fly_id as string,
        user_id: req.user.id,
      },
    });

    if (!fly) return res.status(400).json({ message: "Invalid fly id" });

    const files = await prisma.file.count({
      where: {
        fly_id: fly_id as string,
      },
    });

    const filesThisYear = await prisma.file.count({
      where: {
        fly_id: fly_id as string,
        created_at: {
          gte: dayjs().startOf("year").toDate(),
          lte: dayjs().endOf("year").toDate(),
        },
      },
    });

    res.status(200).json({
      files,
      used_storage: Number(fly.used_storage),
      files_this_year: filesThisYear || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
