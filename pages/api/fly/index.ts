import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies.access_token;

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    ) as {
      uuid: string;
    };

    const uuid = decoded.uuid;

    const flies = await prisma.fly.findMany({
      where: {
        user_id: uuid,
      },
      select: {
        name: true,
        uuid: true,
        used_storage: true,
        updated_at: true,
        storage: true,
      },
    });

    const fliesWithUsedStorageAsNumber = flies.map((fly) => ({
      ...fly,
      used_storage: Number(fly.used_storage),
      storage: Number(fly.storage),
    }));

    res.json(fliesWithUsedStorageAsNumber);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default allowMethods(["GET"])(handler);
