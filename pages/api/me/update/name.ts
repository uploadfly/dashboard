import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default withErrorHandling(withAuth(handler), ["PATCH"]);
