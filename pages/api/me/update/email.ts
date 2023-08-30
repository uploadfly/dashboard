import { APP_DOMAIN } from "@/constants";
import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import prisma from "@/prisma";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import validator from "validator";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const email = req.body.email;

    if (!email)
      return res.status(400).json({ message: "Missing email in request" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const existingEmail = await prisma.emailReset.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      await prisma.emailReset.delete({
        where: {
          uuid: existingEmail?.uuid,
        },
      });
    }

    const newEmail = await prisma.emailReset.create({
      data: {
        user_id: req.user.uuid,
        email,
      },
    });

    const ve = `${APP_DOMAIN}/verify-email?token=${newEmail.uuid}`;

    await sendEmail({
      to: email,
      subject: "Uploadfly - Reset Email",
      body: `<p>Click <a href="${ve}">here</a> to reset your email</p>`,
    });

    res.status(201).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);
