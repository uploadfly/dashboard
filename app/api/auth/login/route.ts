import { NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { isProd } from "@/constants";
import { setCookies } from "@/utils/setCookies";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { messsage: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password!);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    if (!user.email_verified) {
      return NextResponse.json(
        { message: "Email not verified" },
        { status: 400 }
      );
    }
    await setCookies(user.id);

    return NextResponse.json({ message: "Login success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
