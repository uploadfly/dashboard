import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const username: string = req.body.username;

    if (!username) return res.status(400).json({ message: "Missing username" });

    if (username.length < 4)
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters" });

    if (username.length > 50)
      return res
        .status(400)
        .json({ message: "Username must be less than 51 characters" });

    const usernameRegex = /^[a-zA-Z0-9]*$/;

    if (!usernameRegex.test(username))
      return res
        .status(400)
        .json({ message: "Username cannot contain special characters" });

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user)
      return res.status(400).json({ message: "Username is not available" });

    await prisma.user.update({
      where: {
        uuid: req.user.uuid,
      },
      data: {
        username: username,
      },
    });

    res.status(200).json({ message: "Username updated", username });
  } catch (error) {}
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
