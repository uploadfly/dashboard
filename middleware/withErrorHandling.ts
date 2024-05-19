import { NextApiRequest, NextApiResponse } from "next";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

export const withErrorHandling =
  (handler: any, method: HttpMethod | HttpMethod[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method && !method.includes(req.method! as HttpMethod)) {
      res.status(405).json({
        message: `This endpoint supports only ${
          typeof method === "string" ? method : method.join(", ")
        } while your request was a ${req.method}`,
      });
      return;
    }

    try {
      await handler(req, res);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  };
