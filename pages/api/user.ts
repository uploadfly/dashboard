import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import prisma from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
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

export default withErrorHandling(withAuth(handler), ["GET"]);
