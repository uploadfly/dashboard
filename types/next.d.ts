import { UserModel } from "@/interfaces";
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    user: UserModel;
  }
}
