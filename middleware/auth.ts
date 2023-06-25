import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";
import { AuthenticatedRequest } from "@/interfaces";

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token is missing in request" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      uuid: string;
    };
    const { uuid } = decoded;

    if (!uuid) {
      return res.status(400).json({ message: "Missing user id in payload" });
    }

    const user = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    // Attach the user object to the request for future middleware or route handlers
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
