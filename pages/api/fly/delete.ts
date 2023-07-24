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

  const userApiKey = await prisma.apikey.findFirst({
    where: {
      user_id: req.user.uuid,
      active: true,
      permission: "full",
    },
    select: {
      key: true,
    },
  });

  if (!userApiKey)
    return res.status(401).json({
      message: "Create an API key with full access to carry out this action",
    });

  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_UPLOADFLY_URL}/delete/all?fly_id=${fly_id}`,
      {
        headers: {
          Authorization: `Bearer ${userApiKey?.key}`,
        },
      }
    )
    .then(async () => {
      await prisma.fly.delete({
        where: {
          uuid: fly_id,
        },
      });

      res.status(200).json({
        message: "Fly deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Something went wrong." });
    });

  await prisma.apikey
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

export default allowMethods(["DELETE"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
