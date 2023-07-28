import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const fly_id = req.query.fly_id as string;

    if (!fly_id) {
      res.status(400).json({
        message: "Fly ID is missing in request",
      });
      return;
    }

    const fly = await prisma.fly.findUnique({
      where: {
        uuid: fly_id,
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
        fly_id: fly.uuid,
      },
      select: {
        uuid: true,
        created_at: true,
        endpoint: true,
        method: true,
      },
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
