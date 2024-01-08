import prisma from "@/prisma";
import { generateApiKey } from "@/utils/generateApiKey";
import { getProject } from "@/utils/getProject";
import { getUserId } from "@/utils/getUserId";
import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized request." },
      { status: 401 }
    );
  }

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required." },
      { status: 400 }
    );
  }

  const project = await getProject(projectId);

  if (!project) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 }
    );
  }

  if (project.user_id !== userId) {
    return NextResponse.json(
      { message: "You are not authorized to delete this project." },
      { status: 403 }
    );
  }

  let projectApiKey = await prisma.apikey.findFirst({
    where: {
      fly_id: projectId,
      active: true,
      permission: "full",
    },
  });

  if (!projectApiKey) {
    await prisma.apikey.create({
      data: {
        fly_id: projectId,
        permission: "full",
        user_id: userId,
        key: generateApiKey(),
        name: "key",
      },
    });

    projectApiKey = await prisma.apikey.findFirst({
      where: {
        fly_id: projectId,
        active: true,
        permission: "full",
      },
    });
  }

  await axios.delete(
    `${process.env.NEXT_PUBLIC_UPLOADFLY_URL}/delete/all?fly_id=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${projectApiKey?.key}`,
      },
    }
  );

  await prisma.$transaction([
    prisma.apikey.delete({ where: { id: projectApiKey?.id } }),
    prisma.log.deleteMany({ where: { fly_id: projectId } }),
    prisma.file.deleteMany({ where: { fly_id: projectId } }),
    prisma.fly.delete({ where: { id: projectId } }),
  ]);

  return NextResponse.json(
    { message: "Project deleted successfully." },
    { status: 200 }
  );
}
