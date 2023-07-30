import { NextApiRequest } from "next";

export interface FileProps {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
  created_at: Date;
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

export interface KeyProps {
  name: string;
  uuid: string;
  key: string;
  permission: string;
  created_at: string;
}
