import { ExtendedRequest } from "@/interfaces";
import authenticateToken from "@/middleware/auth";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {};

const middlewareChain = allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
