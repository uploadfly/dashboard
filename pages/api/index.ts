import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ cloud: "UploadFly" });
};

export default allowMethods(["GET"])(handler);
