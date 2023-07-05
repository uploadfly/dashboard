import authenticateToken from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

type CustomNextApiRequest = NextApiRequest;
type CustomNextApiResponse = NextApiResponse<any>;

const handler = async (
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) => {
  res.send(req.user.username);
};

const middlewareChain = allowMethods(["GET"])(
  (req: CustomNextApiRequest, res: CustomNextApiResponse) =>
    authenticateToken(req, res, () => handler(req, res))
);

export default middlewareChain;
