import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const fly_id = req.body.fly_id;
    const name = req.body.name;

    if (!fly_id) {
      res.status(400).json({ message: "Fly ID is missing in request" });
      return;
    }

    if (!name) {
      res.status(400).json({ message: "New name is missing in request" });
      return;
    }

    const fly = await prisma.fly.findFirst({
      where: {
        id: fly_id,
        user_id: req.user.id,
      },
    });

    if (!fly) {
      res.status(404).json({ message: "Fly not found" });
      return;
    }

    const flyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{3,100}(?<!-)$/i;

    if (!flyNameRegex.test(name)) {
      res.status(400).json({
        message:
          "Fly names can contain up 100 alphanumeric lowercase characters. Hyphens can be used between the name but never at the start or end.",
      });
      return;
    }

    await prisma.fly.update({
      where: {
        id: fly_id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({ message: "Fly name updated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const middlewareChain = allowMethods(["PUT"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
