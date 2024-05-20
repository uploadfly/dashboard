import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isProd = process.env.NODE_ENV === "production";
  deleteCookie("refresh_token", {
    req,
    res,
    domain: isProd ? ".uploadfly.co" : undefined,
  });
  deleteCookie("access_token", {
    req,
    res,
    domain: isProd ? ".uploadfly.co" : undefined,
  });
  return res.status(200).json({ message: "Logged out" });
};

export default withErrorHandling(withAuth(handler), ["POST"]);
