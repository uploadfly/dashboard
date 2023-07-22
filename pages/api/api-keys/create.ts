import prisma from "@/prisma";
import { generateApiKey } from "@/utils/generateApiKey";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import generate from "boring-name-generator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { fly_id, permission, name } = req.body;

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ message: "Token is missing in request" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      uuid: string;
    };
    const user_id = decoded.uuid;

    const keyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{1,50}(?<!-)$/i;

    if (name && !keyNameRegex.test(name)) {
      return res.status(400).json({
        message:
          "Key names can contain up 50 alphanumeric lowercase characters. Hyphens can be used between the name but never at the start or end.",
      });
    }

    if (!fly_id) return res.status(400).json({ message: "Missing fly id" });
    const user = await prisma.user.findUnique({
      where: {
        uuid: user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid user id" });
    }

    const fly = await prisma.fly.findUnique({
      where: {
        uuid: fly_id,
      },
    });

    if (!fly) {
      return res.status(404).json({ message: "Invalid Fly id" });
    }

    const newAPIKey = await prisma.apikey.create({
      data: {
        name: name || generate().dashed,
        key: `uf_${generateApiKey()}`,
        user_id,
        fly_id,
        permission: permission || "upload",
      },
    });

    return res.status(201).json({
      message: "API has been created",
      key: newAPIKey.key,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["PUT"])(handler);
