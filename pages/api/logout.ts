import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isProd = process.env.NODE_ENV === "production";
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default withErrorHandling(withAuth(handler), ["POST"]);
