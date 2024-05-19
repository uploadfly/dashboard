import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key_id = req.query.key_id as string;

  if (!key_id) {
    res.status(400).json({
      message: "key_id is required",
    });
    return;
  }
  const key = await prisma.apikey.findUnique({
    where: {
      id: key_id,
    },
  });
  if (!key || key.user_id !== req.user.id) {
    res.status(400).json({
      message: "Invalid key ID",
    });
    return;
  }
  await prisma.apikey.delete({
    where: {
      id: key_id,
    },
  });
  res.status(200).json({
    message: "API key has been deleted",
  });
};

export default allowMethods(["DELETE"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
