import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { axios } from "@/configs/axios";
import { RiLoader5Fill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      const response = await axios.post("/auth/login", {
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
      type="login"
      question={{
        route: "/signup",
        text: "Signup",
        title: "New to Uploadfly?",
      }}
      pageName="Login"
    >
      <form
        className="flex flex-col z-40"
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
        <div className="relative">
          <button
            type="button"
            className="absolute right-0 mt-6 mr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Shh...it's a secret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <button
          className="bg-uf-accent w-full rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all disabled:cursor-not-allowed mt-4"
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
