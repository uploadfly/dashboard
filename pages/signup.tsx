import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>("");

  const signupWithEmail = async () => {
    if (!email) {
      toast("Email is required", toastErrorConfig);
      return;
    }

    if (!password) {
      toast("Password is required", toastErrorConfig);
      return;
    }

    if (!confirmPassword) {
      toast("Type your password again", toastErrorConfig);
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match", toastErrorConfig);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/signup`,
        {
          email,
          password,
          confirmPassword,
        }
      );
      toast(res.data.message, toastSuccessConfig);
      setLoading(false);
      setShowOtpInput(true);
    } catch (error: any) {
      console.log(error.response);
      setLoading(false);
      toast(error.response?.data?.message, toastErrorConfig);
    }
  };

  return (
    <AuthLayout
      text="Get started"
      type="signup"
      isOtpInputVisible={showOtpInput}
    >
      <form
        className="flex flex-col gap-8 z-40"
        onSubmit={(e) => {
          e.preventDefault();
          signupWithEmail();
        }}
      >
        {showOtpInput ? (
          <div className="">
            <h1 className="text-center mb-5 text-xl">
              An OTP has been sent your email
            </h1>
            <div className="flex items-center gap-10 justify-center">
              <OTPInput
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={4}
                inputStyle={{
                  width: "70px",
                  height: "70px",
                  margin: "0 5px",
                  borderRadius: "10px",
                  backgroundColor: "#1e1e1e",
                  outlineColor: "#0083cb",
                  fontSize: "24px",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  MozUserSelect: "none",
                  outline: "none",
                  border: "none",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </div>
        ) : (
          <>
            <input
              type="text"
              className="input"
              placeholder="What's your email?"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            />

            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="input"
              placeholder="Shh...it's a secret"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <button className="w-[380px] uf-gradient rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all">
          {loading ? (
            <span className="animate-slide w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-uf-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </span>
          ) : (
            <span className="shadow-2xl">Continue</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
