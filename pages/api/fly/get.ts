import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import prisma from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const { fly_name, username } = req.query as {
      fly_name: string;
      username: string;
    };

    if (!fly_name) {
      res.status(400).json({
        message: "Missing fly name",
      });
      return;
    }

    if (!username) {
      res.status(400).json({
        message: "Missing username",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid user id" });
    }

    if (user.username !== username) {
      return res.status(404).json({ message: "Invalid username" });
    }

    const fly = await prisma.fly.findFirst({
      where: {
        name: fly_name,
        user_id: user.id,
      },
    });

    if (!fly) {
      return res.status(404).json({ message: "Fly not found" });
    }

    res.status(200).json({
      id: fly.id,
      name: fly.name,
      plan: fly.plan,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
