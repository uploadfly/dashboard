import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import prisma from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uuid: req.user.uuid,
      },
      select: {
        username: true,
        email: true,
        name: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
