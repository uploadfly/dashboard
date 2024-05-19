import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default withErrorHandling(withAuth(handler), ["GET"]);
