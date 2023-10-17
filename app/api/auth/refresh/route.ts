import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken";
import prisma from "@/prisma";
import dayjs from "dayjs";

export async function POST(request: Request) {
  try {
    const refreshToken = cookies().get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = verify(refreshToken, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const accessToken = sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "15m" }
    );

    const isProd = process.env.NODE_ENV === "production";

    cookies().set("access_token", accessToken, {
      domain: isProd ? ".uploadfly.co" : undefined,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
      expires: dayjs().add(15, "minutes").toDate(),
    });
    return NextResponse.json({ message: "Refreshed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error logging out." }, { status: 500 });
  }
}
