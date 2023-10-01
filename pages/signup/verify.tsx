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
      <div className="">Click the button below to verify your account.</div>
      <button className="bg-uf-accent text-uf-light mt-10 px-24 py-2 font-semibold rounded-md">
        Verify Account
      </button>
    </AuthLayout>
  );
};

export default VerifyAccount;
