import { axiosAuth } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiLoader5Fill } from "react-icons/ri";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!otp) {
      toast("OTP is required", toastErrorConfig);
      return;
    }

    if (otp.length < 4) {
      toast("Enter all 4 chracters", toastErrorConfig);
      return;
    }

    if (!password) {
      toast("Password is required", toastErrorConfig);
      return;
    }

    if (password.length < 8) {
      toast("Password must be at least 8 characters", toastErrorConfig);
      return;
    }

    if (!confirmPassword) {
      toast("Enter password again", toastErrorConfig);
      return;
    }

    if (password !== confirmPassword) {
      toast("Password do not match", toastErrorConfig);
      return;
    }

    try {
      setLoading(true);
      await axiosAuth.put("/reset-password", {
        otp,
        password,
        confirmPassword,
      });
      toast("Password has been reset", toastSuccessConfig);
      setTimeout(() => {
        router.push("/login");
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
        className="flex flex-col z-40"
      >
        <input
          type="text"
          className="input"
          placeholder="OTP sent to your email"
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Enter new password again"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="Show password"
            onChange={() => setShowPassword(!showPassword)}
          />
          <p>Show password</p>
        </div>
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
