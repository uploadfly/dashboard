import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { axios, axiosAuth } from "@/configs/axios";
import { useRouter } from "next/router";
import { RiLoader5Fill } from "react-icons/ri";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isSignupSuccessful, setIsSignupSuccessful] = useState<boolean>(false);

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
      const res = await axios.post("/auth/signup", {
        email,
        password,
        confirmPassword,
      });
      toast(res.data.message, toastSuccessConfig);
      setIsSignupSuccessful(true);
    } catch (error: any) {
      console.log(error.response);

      toast(
        error.response?.data?.message || "Something went wrong",
        toastErrorConfig
      );
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  return (
    <AuthLayout
      text={isSignupSuccessful ? "Signup successful" : "Create an account"}
      type="signup"
      hideFlyingThing
      hideExtras={isSignupSuccessful}
      question={{
        route: "/login",
        text: "Login",
        title: "Already have an account?",
      }}
      pageName="Signup"
    >
      <form
        className="flex flex-col z-40"
        onSubmit={(e) => {
          e.preventDefault();

          signupWithEmail();
          return;
        }}
      >
        {isSignupSuccessful && (
          <div className="">
            <h1 className="text-center mb-5 text-xl">
              A verification link has been sent to your email.
            </h1>
          </div>
        )}
        {!isSignupSuccessful && (
          <>
            <input
              type="text"
              className="input"
              placeholder="What's your email?"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <button
                  type="button"
                  className="absolute right-0 mt-6 mr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input"
                placeholder="Shh...it's a secret"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && (
                <button
                  type="button"
                  className="absolute right-0 mt-6 mr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
              )}
            </div>
            <button className="w-[380px] bg-uf-accent rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all mt-4">
              {loading ? (
                <RiLoader5Fill className="animate-spin text-2xl" />
              ) : (
                <span className="shadow-2xl">Signup</span>
              )}
            </button>
          </>
        )}
      </form>
    </AuthLayout>
  );
};

export default Signup;
