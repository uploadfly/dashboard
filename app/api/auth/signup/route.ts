import { APP_DOMAIN } from "@/constants";
import prisma from "@/prisma";
import { generateRandomKey } from "@/utils/generateRandomKey";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs";
import plunk from "@/configs/plunk";
import { render } from "@react-email/render";
import { VerifyEmail } from "@/emails/verify-email";

export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword } = await request.json();

    if (!email || !password || !confirmPassword)
      return NextResponse.json(
        { message: "All fields are required." },
        {
          status: 400,
        }
      );

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        {
          status: 400,
        }
      );
    }

    if (!validator.isLength(password, { min: 8 })) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        {
          status: 400,
        }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "There is an account associated with this email." },
        {
          status: 400,
        }
      );
    }

    let user_name;

    const doesUsernameExist = await prisma.user.findUnique({
      where: { username: email.split("@")[0].toLowerCase() },
    });

    if (doesUsernameExist) {
      user_name = `${email.split("@")[0].toLowerCase()}${generateRandomKey(3)}`;
    } else {
      user_name = email.split("@")[0].toLowerCase();
    }

    const otp = generateRandomKey(6);

    const verificationLink = `${APP_DOMAIN}/signup/verify?email=${email}&otp=${otp}`;

    await prisma.user.create({
      data: {
        username: user_name,
        email,
        password: bcrypt.hashSync(password, 10),
        otp,
        otp_expiry: dayjs().add(2, "hour").toDate(),
        auth_method: "email and password",
      },
    });

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

    return NextResponse.json(
      { message: "Account created successfully." },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while creating your account." },
      {
        status: 500,
      }
    );
  }
}
