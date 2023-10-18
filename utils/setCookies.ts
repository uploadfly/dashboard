import { isProd } from "@/constants";
import prisma from "@/prisma";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export const setCookies = async (user_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  const userExistingToken = await prisma.refreshToken.findFirst({
    where: {
      user_id,
    },
  });

  if (dayjs().isAfter(dayjs(userExistingToken?.expires_at))) {
    await prisma.refreshToken.delete({
      where: {
        id: userExistingToken?.id,
      },
    });
  }

  const payload = { id: user?.id };

  const secretKey = process.env.JWT_SECRET_KEY!;

  const accessToken = sign(payload, secretKey, {
    expiresIn: "15m",
  });

  const refreshToken =
    userExistingToken?.token || sign(payload, secretKey, { expiresIn: "90d" });

  if (!userExistingToken) {
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user_id: user?.id!,
        expires_at: dayjs().add(90, "days").toISOString(),
      },
    });
  }

  cookies().set("access_token", accessToken, {
    domain: isProd ? ".uploadfly.co" : undefined,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
    expires: dayjs().add(15, "minutes").toDate(),
  });

  cookies().set("refresh_token", refreshToken, {
    domain: isProd ? ".uploadfly.co" : undefined,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
    expires: dayjs().add(90, "days").toDate(),
  });
};
