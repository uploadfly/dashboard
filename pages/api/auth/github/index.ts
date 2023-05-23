import passport from "@/lib/passport-github-auth";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(passport.initialize());

handler.get(
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);

export default handler;
