import { APP_DOMAIN } from "@/constants";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { sendEmail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

import validator from "validator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
        id: existingEmail?.id,
      },
    });
  }

  const newEmail = await prisma.emailReset.create({
    data: {
      user_id: req.user.id,
      email,
    },
  });

  const ve = `${APP_DOMAIN}/verify-email?token=${newEmail.id}`;

  await sendEmail({
    to: email,
    subject: "UploadFly - Reset Email",
    body: `<p>Click <a href="${ve}">here</a> to reset your email</p>`,
  });

  res.status(201).json({ message: "Email sent" });
};

export default withErrorHandling(withAuth(handler), ["POST"]);
