import { NextApiRequest } from "next";

export interface FileProps {
  id: number;
  name: string;
  mimetype: string;
  size: number;
  url: string;
  uploaded: Date;
}

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    uuid: string;
  };
}
