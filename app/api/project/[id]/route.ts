import prisma from "@/prisma";
import { getUserId } from "@/utils/getUserId";
import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
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

    const project = await prisma.fly.findUnique({
      where: { id: projectId },
    });

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

    const projectApiKey = await prisma.apikey.findFirst({
      where: { fly_id: projectId, active: true, permission: "full" },
    });

    if (!projectApiKey) {
      return NextResponse.json(
        { message: "Create a full-access API key to carry out this action." },
        { status: 400 }
      );
    }

    await axios.delete(
      `${process.env.NEXT_PUBLIC_UPLOADFLY_URL}/delete/all?fly_id=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${projectApiKey.key}`,
        },
      }
    );

    await prisma.$transaction([
      prisma.apikey.delete({ where: { id: projectApiKey.id } }),
      prisma.log.deleteMany({ where: { fly_id: projectId } }),
      prisma.file.deleteMany({ where: { fly_id: projectId } }),
      prisma.fly.delete({ where: { id: projectId } }),
    ]);

    return NextResponse.json(
      { message: "Project deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Project not deleted." },
      { status: 500 }
    );
  }
}
