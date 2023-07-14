import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import axios from "axios";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const fly_id = req.query.fly_id as string;

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
    res.status(400).json({ message: "Invalid fly ID" });
    return;
  }

  if (fly.user_id !== req.user.uuid) {
    res
      .status(403)
      .json({ message: "You are not authorized to delete this fly" });
    return;
  }

  const userApiKey = await prisma.apiKey.findFirst({
    where: {
      user_id: req.user.uuid,
      active: true,
    },
    select: {
      secret_key: true,
    },
  });

  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_UPLOADFLY_URL}/delete/all?folder_id=${fly?.public_key}`,
      {
        headers: {
          Authorization: `Bearer ${userApiKey?.secret_key}`,
        },
      }
    )
    .then(async () => {
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
      res.status(200).json({
        message: "Fly deleted successfully",
      });
    });

  await prisma.apiKey
    .deleteMany({
      where: {
        user_id: req.user.uuid,
      },
    })

    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
      console.log(err.response);
    });
};

const middlewareChain = allowMethods(["DELETE"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
