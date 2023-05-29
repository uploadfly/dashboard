import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loginWithEmail = async () => {
    if (!email) {
      toast("Email is required", toastErrorConfig);
      return;
    }

    if (!password) {
      toast("Password is required", toastErrorConfig);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
        {
          email,
          password,
        }
      );
      console.log(res);
      toast("Login successful", toastSuccessConfig);
      // window.open(`${process.env.NEXT_PUBLIC_AUTH_URL}/dashboard`, "_self");
      setLoading(false);
    } catch (error: any) {
      console.log(error.response);
      toast(error.response.data.message, toastErrorConfig);
      setLoading(false);
    }
  };

  return (
    <AuthLayout text="Welcome back">
      <form
        className="flex flex-col gap-8 z-40"
        onSubmit={(e) => {
          e.preventDefault();
          loginWithEmail();
        }}
      >
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
          placeholder="Shh...it's a secret"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="uf-gradient w-full rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all">
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
            <span className="shadow-2xl">Login</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
