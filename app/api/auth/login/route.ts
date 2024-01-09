import { NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
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

    const userData = {
      username: user?.username,
      email: user?.email,
    };

    return NextResponse.json(
      { message: "Login success", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
