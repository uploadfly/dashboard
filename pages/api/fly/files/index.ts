import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id;

  if (!fly_id) {
    res.status(400).json({
      message: "Fly ID is missing in request",
    });
    return;
  }

  const fly = await prisma.fly.findUnique({
    where: {
      uuid: fly_id as string,
    },
  });

  if (!fly) {
    res.status(400).json({
      message: "Invalid fly ID",
    });
    return;
  }

  if (fly.user_id !== req.user.uuid) {
    res.status(400).json({
      message: "Invalid fly ID",
    });
    return;
  }

  const files = await prisma.file.findMany({
    where: {
      fly_id: fly.uuid,
    },
    select: {
      path: true,
      size: true,
      url: true,
      created_at: true,
      name: true,
      type: true,
    },
  });

  const filesWithSizeAsNumber = files.map((file) => ({
    ...file,
    size: Number(file.size),
  }));

  res.status(200).json({
    message: "Files retrieved successfully",
    files: filesWithSizeAsNumber,
  });
};

const middlewareChain = allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
