import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  return (
    <AuthLayout
      text="Forgot Password"
      type="forgot"
      question={{
        route: "/login",
        text: "Login",
        title: "Remember password?",
      }}
      hideFlyingThing={true}
      pageName="Forgot password"
    >
      <form>
        <input type="text" className="input" placeholder="What's your email?" />
        <button className="w-[380px] bg-uf-accent rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all mt-5">
          {loading ? (
            <RiLoader5Fill className="animate-spin text-2xl" />
          ) : (
            <span className="shadow-2xl">Reset</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
