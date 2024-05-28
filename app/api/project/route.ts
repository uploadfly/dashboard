import prisma from "@/prisma";
import { getUserId } from "@/utils/getUserId";
import { NextResponse } from "next/server";
import validator from "validator";
import generate from "boring-name-generator";
import { generateRandomKey } from "@/utils/generateRandomKey";

export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized request." },
        { status: 401 }
      );
    }

    const { name, project_url } = await request.json();
    const flyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{3,100}(?<!-)$/i;

    if (!flyNameRegex.test(name)) {
      return NextResponse.json(
        {
          message:
            "Fly names can contain up 100 alphanumeric lowercase characters. Hyphens can be used between the name but never at the start or end.",
        },
        { status: 400 }
      );
    }
    if (project_url && !validator.isURL(project_url)) {
      return NextResponse.json(
        { message: "Invalid project URL" },
        { status: 400 }
      );
    }

    // const userProjects = await prisma.fly.count({
    //   where: {
    //     user_id: userId,
    //   },
    // });

    // const freeProjects = await prisma.fly.count({
    //   where: {
    //     user_id: userId,
    //     plan: "free",
    //   },
    // });

    // const hasTwoFreeProjects = freeProjects >= 2;

    // if (hasTwoFreeProjects) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "You have reached the maximum number of projects you can have.",
    //     },
    //     { status: 400 }
    //   );
    // }

    const project = await prisma.fly.create({
      data: {
        name: name.toLowerCase().replaceAll(" ", "-") || generate().dashed,
        project_url,
        user_id: userId,
        public_key: generateRandomKey(6),
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      {
        message: "Project created successfully.",
        name: project.name,
        id: project.id,
        redirect: `/${user?.username}/${project.name}`,
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
