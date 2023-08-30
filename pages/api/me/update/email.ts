import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import validator from "validator";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const email = req.body.email;
  try {
    if (!email)
      return res.status(400).json({ message: "Missing email in request" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    await prisma.emailReset.create({
      data: {
        user_id: req.user.uuid,
        email,
      },
    });
    res.status(201).json({ message: "Email sent" });
  } catch (error) {}
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
