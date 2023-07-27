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
        endpoint: true,
        ip_address: true,
      },
    });
  } catch (error) {}
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
