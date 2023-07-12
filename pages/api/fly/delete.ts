import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import axios from "axios";
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

  await axios
    .delete(`http://localhost:2001/delete/all?folder_id?${fly?.public_key}`)
    .then(() => {
      prisma.fly.delete({
        where: {
          uuid: fly_id,
        },
      });

      prisma.file.deleteMany({
        where: {
          fly_id: fly_id,
        },
      });
      res.status(200).json({
        message: "Fly deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
      console.log(err);
    });
};

const middlewareChain = allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
