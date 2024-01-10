import prisma from "@/prisma";
import { getUserId } from "@/utils/getUserId";
import { NextResponse } from "next/server";
import validator from "validator";
import generate from "boring-name-generator";
import { generateRandomKey } from "@/utils/generateRandomKey";

export async function GET(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized request." },
        { status: 401 }
      );
    }

    const allProjects = await prisma.fly.count({
      where: {
        user_id: userId,
      },
    });

    const freeProjects = await prisma.fly.count({
      where: {
        user_id: userId,
        plan: "free",
      },
    });

    return NextResponse.json(
      {
        all: allProjects,
        free: freeProjects,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the project.",
      },
      {
        status: 500,
      }
    );
  }
}
