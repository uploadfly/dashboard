import { NextApiRequest } from "next";

export interface FileProps {
  id: number;
  name: string;
  mimetype: string;
  size: number;
  url: string;
  uploaded: Date;
}

export interface ExtendedRequest extends NextApiRequest {
  user: UserModel;
}

export interface UserModel {
  id: number;
  email: string;
  username: string;
  password?: string;
  otp?: string;
  otp_expiry?: Date;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  uuid: string;
  auth_method?: string;
  github_id?: number;
}
