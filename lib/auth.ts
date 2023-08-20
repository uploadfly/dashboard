import { jwtVerify } from "jose";

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Refresh token secret not found");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
    return verified.payload as { uuid: string; username: string };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
