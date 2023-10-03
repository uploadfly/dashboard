import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const name: string = req.body.name;

    if (!name)
      return res.status(400).json({ message: "Missing name in request" });

    if (name.length < 2)
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters" });

    if (name.length > 32)
      return res
        .status(400)
        .json({ message: "Name must be less than 32 characters" });

    const nameRegex = /^[a-zA-Z0-9]*$/;

    if (!nameRegex.test(name))
      return res
        .status(400)
        .json({ message: "Username cannot contain special characters" });

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: name,
      },
    });

    res.status(200).json({ message: "Name updated", name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["PATCH"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
