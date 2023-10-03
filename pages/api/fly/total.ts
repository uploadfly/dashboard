import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
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
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
