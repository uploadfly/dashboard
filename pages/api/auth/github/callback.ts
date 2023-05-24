import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const { GITHUB_CLIENT_ID } = process.env;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const githubAuthUrl = "https://github.com/login/oauth/authorize";

  const queryParams = querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${req.headers.origin}/api/auth/github`,
    scope: "user:email",
  });

  res.redirect(`${githubAuthUrl}?${queryParams}`);
}
