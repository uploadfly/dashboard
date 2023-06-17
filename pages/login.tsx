import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { axiosAuth } from "@/configs/axios";
import { RiLoader5Fill } from "react-icons/ri";

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
        <button
          className="uf-gradient w-full rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin text-2xl">
              <RiLoader5Fill />
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
