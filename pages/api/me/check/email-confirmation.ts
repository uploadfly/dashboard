import { ExtendedRequest } from "@/interfaces";
import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const emailRecord = await prisma.emailReset.findFirst({
      where: {
        user_id: req.user.id,
        email: req.query.email as string,
      },
    });

    if (!emailRecord)
      return res.status(404).json({ message: "Not email record found" });
    res.status(200).json({ confirmed: emailRecord.is_verified });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default withErrorHandling(withAuth(handler), ["GET"]);
