import prisma from "@/prisma";
import { generateApiKey } from "@/utils/generateApiKey";
import { NextApiRequest, NextApiResponse } from "next";
import generate from "boring-name-generator";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fly_id, permission, name } = req.body;

  if (name) {
    return res.status(400).json({
      message: "Key name is required",
    });
  }

  if (!fly_id) return res.status(400).json({ message: "Missing fly id" });
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid user id" });
  }

  const fly = await prisma.fly.findUnique({
    where: {
      id: fly_id,
    },
  });

  if (!fly) {
    return res.status(404).json({ message: "Invalid Fly id" });
  }

  const newAPIKey = await prisma.apikey.create({
    data: {
      name: name || generate().dashed,
      key: `uf_${generateApiKey()}`,
      user_id: req.user.id,
      fly_id,
      permission: permission || "upload",
    },
  });

  return res.status(201).json({
    message: "API has been created",
    key: newAPIKey.key,
    id: newAPIKey.id,
    name: newAPIKey.name,
    permission: newAPIKey.permission,
  });
};

export default withErrorHandling(withAuth(handler), ["POST"]);
