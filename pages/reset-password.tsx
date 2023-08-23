import { axiosAuth } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiLoader5Fill } from "react-icons/ri";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      toast("Email is required", toastErrorConfig);
      return;
    }
    try {
      setLoading(true);
      await axiosAuth.put("/forgot-password", {
        email,
      });
      toast("Email sent", toastSuccessConfig);
      setTimeout(() => {
        router.push("/reset-password");
      }, 1500);
    } catch (error: any) {
      toast(error.response.data.message, toastErrorConfig);

      setLoading(false);
    }
  };

  return (
    <AuthLayout
      text="Reset Password"
      type="forgot"
      hideFlyingThing={true}
      pageName="Reset password"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="input"
          placeholder="What's your email?"
          onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
        />
        <button
          className="w-[380px] bg-uf-accent rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all mt-5 disabled:opacity-70"
          disabled={loading}
        >
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

export default ResetPassword;
