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
    const { query } = router;
    const returnTo = query.returnTo ? query.returnTo.toString() : null;

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
      const response = await axiosAuth.post("/login", {
        email,
        password,
      });
      const userData = response?.data?.user;
      if (userData && userData.username) {
        toast("Login successful", toastSuccessConfig);
        if (returnTo) {
          router.push(returnTo);
          return;
        }
        router.push(`/${userData.username}`);
        return;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast(errorMessage, toastErrorConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      text="Welcome back"
      question={{
        route: "/signup",
        text: "Signup",
        title: "New to Uploadfly?",
      }}
      pageName="Login"
    >
      <form
        className="flex flex-col gap-8 z-40"
        onSubmit={(e) => {
          e.preventDefault();
          loginWithEmail();
        }}
      >
        {/**I had a long travel today, just typing this comment so I don't lose my GitHub streak*/}
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
          className="bg-uf-accent w-full rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <RiLoader5Fill className="animate-spin text-2xl" />
          ) : (
            <span className="shadow-2xl">Login</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
