import prisma from "@/prisma";
import axios from "axios";
import { generateApiKey } from "./generateApiKey";

export const deleteAllFiles = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
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
    prisma.file.deleteMany({ where: { fly_id: projectId } }),
  ]);

  await prisma.fly.update({
    where: {
      id: projectId,
    },
    data: {
      plan: "free",
      storage: 2000000000,
      paused: false,
    },
  });
};
