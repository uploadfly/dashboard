import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import querystring from "querystring";

const { GITHUB_CLIENT_ID, GITHUB_SECRET } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.query;

    // Exchange the authorization code with an access token
    const { data: tokenResponse } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_SECRET,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token: accessToken } = tokenResponse;

    const { data: userResponse } = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );

    const { email, login: username, id: githubId } = userResponse;

    res.redirect("/");
  } catch (error) {
    console.error("GitHub authentication error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during authentication", err: error });
  }
}
