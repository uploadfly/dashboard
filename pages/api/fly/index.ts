import { ExtendedRequest } from "@/interfaces";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const flies = await prisma.fly.findMany({
      where: {
        user_id: req.user.id,
      },
      select: {
        name: true,
        id: true,
        used_storage: true,
        updated_at: true,
        storage: true,
        plan: true,
        paused: true,
      },
    });

    const fliesWithUsedStorageAsNumber = flies.map((fly: any) => ({
      ...fly,
      used_storage: Number(fly.used_storage),
      storage: Number(fly.storage),
    }));

    res.json(fliesWithUsedStorageAsNumber);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default withErrorHandling(withAuth(handler), ["GET"]);
