import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AuthLayout from "@/layouts/AuthLayout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { axiosAuth } from "@/configs/axios";
import { useRouter } from "next/router";
import { RiLoader5Fill } from "react-icons/ri";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [accountVerified, setAccountVerified] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [wantsToChangeUsername, setWantsToChangeUsername] =
    useState<boolean>(false);

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
      const res = await axiosAuth.post("/signup", {
        email,
        password,
        confirmPassword,
      });
      toast(res.data.message, toastSuccessConfig);
      setLoading(false);
      setShowOtpInput(true);
    } catch (error: any) {
      console.log(error.response);
      setLoading(false);
      toast(
        error.response?.data?.message || "Something went wrong",
        toastErrorConfig
      );
    }
  };

  const router = useRouter();

  const completeSignup = async () => {
    if (!otp) {
      toast("OTP is required", toastErrorConfig);
      return;
    }

    if (otp.length < 4) {
      toast("Enter all 4 chracters", toastErrorConfig);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axiosAuth.put("/verify", {
        otp,
      });
      toast("Welcome to Uploadfly", toastSuccessConfig);
      setAccountVerified(true);
      setUsername(data?.user?.username);
      // router.push(`/${data?.user?.username}`);
    } catch (error: any) {
      toast(
        error?.response?.data?.message || "Something went wrong",
        toastErrorConfig
      );
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      text="Get started"
      type="signup"
      hideExtras={showOtpInput || accountVerified}
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
          if (!showOtpInput) {
            signupWithEmail();
            return;
          }
          completeSignup();
        }}
      >
        {showOtpInput && !accountVerified && (
          <div className="">
            <h1 className="text-center mb-5 text-xl">
              An OTP has been sent your email
            </h1>
            <div className="flex items-center justify-center">
              <OTPInput
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={4}
                shouldAutoFocus
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  margin: "0 15px",
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
        )}
        {!showOtpInput && !accountVerified && (
          <>
            <input
              type="text"
              className="input"
              placeholder="What's your email?"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            />

            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Shh...it's a secret"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        {accountVerified && (
          <div className="">
            Your username is <span>{username}, do you want to change it?</span>
          </div>
        )}
        {!showOtpInput && !accountVerified && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="Show password"
              onChange={() => setShowPassword(!showPassword)}
            />
            <p>Show password</p>
          </div>
        )}
        {(wantsToChangeUsername || !accountVerified) && (
          <button className="w-[380px] bg-uf-accent rounded-md py-2 h-10 flex items-center justify-center text-[#1e1e1e] font-bold hover:scale-105 transition-all mt-4">
            {loading ? (
              <RiLoader5Fill className="animate-spin text-2xl" />
            ) : (
              <span className="shadow-2xl">
                {showOtpInput ? "Complete signup" : "Continue"}
              </span>
            )}
          </button>
        )}
      </form>
    </AuthLayout>
  );
};

export default Signup;
