import prisma from "@/prisma";

export const getProject = async (id: string) => {
  const project = await prisma.fly.findUnique({ where: { id } });
  return project;
};
