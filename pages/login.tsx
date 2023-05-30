import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { axiosAuth } from "@/configs/axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
      const res = await axiosAuth.post("/login", {
        email,
        password,
      });
      toast("Login successful", toastSuccessConfig);
      router.push(`/${res?.data?.user?.username}`);
      setLoading(false);
    } catch (error: any) {
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
          type="email"
          className="input"
          placeholder="What's your email?"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
          name="email"
        />
        <input
          type="password"
          className="input"
          placeholder="Shh...it's a secret"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
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
