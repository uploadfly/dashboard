import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const fly_id = req.query.fly_id;

    if (!fly_id) {
      res.status(400).json({ message: "Fly id is missing in request" });
      return;
    }

    const fly = await prisma.fly.findFirst({
      where: {
        uuid: fly_id as string,
        user_id: req.user.uuid,
      },
    });

    if (!fly) return res.status(400).json({ message: "Invalid fly id" });

    const files = await prisma.file.count({
      where: {
        fly_id: fly_id as string,
      },
    });

    res.status(200).json({
      files,
      used_storage: Number(fly.used_storage),
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
