import withAuth from "@/middleware/auth";
import { withErrorHandling } from "@/middleware/withErrorHandling";
import prisma from "@/prisma";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username: string = req.body.username;

  if (!username)
    return res.status(400).json({ message: "Missing username in request" });

  if (username.length < 4)
    return res
      .status(400)
      .json({ message: "Username must be at least 4 characters" });

  if (username.length > 50)
    return res
      .status(400)
      .json({ message: "Username must be less than 51 characters" });

  const usernameRegex = /^[a-zA-Z0-9]*$/;

  if (!usernameRegex.test(username))
    return res
      .status(400)
      .json({ message: "Username cannot contain special characters" });

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user)
    return res.status(400).json({ message: "Username is not available" });

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      username: username.toLowerCase().trim(),
    },
  });

  const payload = {
    id: req.user.id,
    username,
  };

  const newRefreshToken = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "90d",
  });

  const newAccessToken = sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "15m",
  });

  await prisma.refreshToken.update({
    where: {
      user_id: req.user.id,
    },
    data: {
      token: newRefreshToken,
      expires_at: dayjs().add(90, "days").toISOString(),
    },
  });

  setCookie("refresh_token", newRefreshToken, {
    expires: dayjs().add(90, "days").toDate(),
    req,
    res,
  });

  setCookie("access_token", newAccessToken, {
    expires: dayjs().add(15, "minutes").toDate(),
    req,
    res,
  });

  res.status(200).json({ message: "Username updated", username });
};

export default withErrorHandling(withAuth(handler), ["PATCH"]);
