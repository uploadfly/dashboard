import passwordReset from "@/emails/password-reset";
import prisma from "@/prisma";
import { generateRandomKey } from "@/utils/generateRandomKey";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import validator from "validator";

export async function PUT(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "There is not account associated with this email",
        },
        { status: 404 }
      );
    }
    const otp = generateRandomKey(4);

    await passwordReset(user.email, otp);

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otp_expiry: dayjs().add(30, "minutes").toISOString(),
      },
    });
    return NextResponse.json({ message: "OTP sent" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
