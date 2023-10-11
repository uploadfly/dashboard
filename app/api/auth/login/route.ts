"use server";

import { NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";

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

    const userExistingToken = await prisma.refreshToken.findFirst({
      where: {
        user_id: user.id,
      },
    });

    if (dayjs().isAfter(dayjs(userExistingToken?.expires_at))) {
      await prisma.refreshToken.delete({
        where: {
          id: userExistingToken?.id,
        },
      });
    }

    const payload = { id: user.id };

    const secretKey = process.env.JWT_SECRET_KEY!;

    const accessToken = sign(payload, secretKey, {
      expiresIn: "15m",
    });

    const refreshToken =
      userExistingToken?.token ||
      sign(payload, secretKey, { expiresIn: "90d" });

    if (!userExistingToken) {
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          user_id: user.id,
          expires_at: dayjs().add(90, "days").toISOString(),
        },
      });
    }

    cookies().set("access_token", accessToken, {});
    cookies().set("refresh_token", refreshToken);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
