import AuthLayout from "@/layouts/AuthLayout";
import React from "react";

const VerifyAccount = () => {
  return (
    <AuthLayout
      pageName="Verify Account"
      hideFlyingThing
      text="Verify your account"
      hideExtras
    >
      <div className=""></div>
    </AuthLayout>
  );
};

export default VerifyAccount;
