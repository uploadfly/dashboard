import prisma from "@/prisma";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  try {
    const {
      otp,
      password,
      confirmPassword,
    }: { otp: string; password: string; confirmPassword: string } =
      await request.json();

    if (!otp) {
      return NextResponse.json(
        {
          message: "OTP is required",
        },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        {
          message: "Password is required",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        otp,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "OTP is invalid",
        },
        { status: 400 }
      );
    }

    if (dayjs().isAfter(dayjs(user.otp_expiry))) {
      return NextResponse.json(
        {
          message: "OTP has expired",
        },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: bcrypt.hashSync(password, 10),
        otp: "",
        otp_expiry: null,
      },
    });
    return NextResponse.json(
      { message: "Password has been reset" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
