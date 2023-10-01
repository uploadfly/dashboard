import { VerifyEmail } from "@/emails/verify-email";
import React from "react";

const Emails = () => {
  return (
    <div>
      <VerifyEmail link="https://www.google.com" />
    </div>
  );
};

export default Emails;
