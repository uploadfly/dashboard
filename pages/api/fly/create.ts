import prisma from "@/prisma";
import { generateRandomKey } from "@/utils/generateRandomKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import generate from "boring-name-generator";
import validator from "validator";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const { name, project_url } = req.body as {
      name: string;
      project_url: string;
    };

    const flyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{3,100}(?<!-)$/i;

    if (!flyNameRegex.test(name)) {
      return res.status(400).json({
        message:
          "Fly names can contain up 100 alphanumeric lowercase characters. Hyphens can be used between the name but never at the start or end.",
      });
    }

    if (project_url && !validator.isURL(project_url)) {
      return res.status(400).json({
        message: "Invalid project URL",
      });
    }

    if (!req.user.id) {
      res.status(400).json({
        message: "User UUID is not found",
      });
      return;
    }

    const user_id = req.user?.id;

    console.log(req.user);

    const userFlies = await prisma.fly.count({
      where: {
        user_id,
      },
    });

    if (userFlies === 2) {
      return res.status(400).json({
        message: "You can have a maximum of two flies",
      });
    }

    const fly = await prisma.fly.create({
      data: {
        user_id,
        name: name.toLowerCase().replaceAll(" ", "-") || generate().dashed,
        public_key: generateRandomKey(6),
        project_url,
      },
    });

    res.status(201).json({
      message: "Fly created",
      redirect: `/${req.user.username}/${fly.name}`,
      name: fly.name,
      id: fly.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
