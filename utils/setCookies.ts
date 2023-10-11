"use server";
import { cookies } from "next/headers";

const setCookies = (user_id: string) => {
  cookies().set("user_id", user_id);
};
