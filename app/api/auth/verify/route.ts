import { isProd } from "@/constants";
import welcomeToUploadfly from "@/emails/welcome-to-uploadfly";
import prisma from "@/prisma";
import { setCookies } from "@/utils/setCookies";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { otp, email } = await request.json();

    if (!otp) {
      return NextResponse.json(
        {
          message: "OTP is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        otp,
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid validation link",
        },
        { status: 400 }
      );
    }

    if (dayjs().isAfter(dayjs(user.otp_expiry))) {
      return NextResponse.json(
        {
          message: "Validation link has expired",
        },
        { status: 400 }
      );
    }

    const verifiedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified: true,
        otp: null,
        otp_expiry: null,
      },
    });

    const userData = {
      username: verifiedUser?.username,
      email: verifiedUser?.email,
    };

    await setCookies(verifiedUser.id);

    await welcomeToUploadfly(verifiedUser.email);
    // subToPlunk(verifiedUser.email)

    return NextResponse.json(
      {
        message: "Verified",
        user: userData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
}
