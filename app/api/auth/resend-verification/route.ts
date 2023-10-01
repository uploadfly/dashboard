import plunk from "@/configs/plunk";
import { APP_DOMAIN } from "@/constants";
import prisma from "@/prisma";
import { generateRandomKey } from "@/utils/generateRandomKey";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email)
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return NextResponse.json(
        {
          message: "There is no account associated with the provided email.",
        },
        {
          status: 404,
        }
      );

    const otp = generateRandomKey(6);

    const verificationLink = `${APP_DOMAIN}/signup/verify?email=${email}&otp=${otp}`;

    await plunk.emails.send({
      to: email,
      subject: "Verify your account",
      body: `
            <p>Hello,</p>
            <p>Please click the link below to verify your account:</p>
            <p><a href="${verificationLink}">Verify your account</a></p>
            <p>If you did not request this, please ignore this email.</p>
        `,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp,
        otp_expiry: dayjs().add(2, "hours").toDate(),
      },
    });

    return NextResponse.json(
      { message: "An OTP has been sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
