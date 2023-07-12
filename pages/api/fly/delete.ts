import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const fly_id = req.body.fly_id;

  if (!fly_id) {
    res.status(400).json({ message: "Fly ID is missing in request" });
    return;
  }
  const fly = await prisma.fly.findUnique({
    where: {
      uuid: fly_id,
    },
  });

  if (!fly) {
    res.status(400).json({ message: "Fly not found" });
    return;
  }

  if (fly.uuid !== req.user.uuid) {
    res
      .status(403)
      .json({ message: "You are not authorized to delete this fly" });
    return;
  }

  await prisma.fly.delete({
    where: {
      uuid: fly_id,
    },
  });

  await prisma.file.deleteMany({
    where: {
      fly_id: fly_id,
    },
  });
};

const middlewareChain = allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
