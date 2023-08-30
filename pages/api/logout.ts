import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    deleteCookie("refresh_token", { req, res });
    deleteCookie("access_token", { req, res });
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default allowMethods(["POST"])(handler);
