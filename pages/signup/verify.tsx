import AuthLayout from "@/layouts/AuthLayout";
import useHref from "use-href";
import React from "react";
import { axios, axiosAuth } from "@/configs/axios";
import toast from "react-hot-toast";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/router";

const VerifyAccount = () => {
  const href = useHref();
  const router = useRouter();

  const [otp, setOtp] = React.useState<string | null>("");
  const [email, setEmail] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState(false);
  const [hasLinkExpired, setHasLinkExpired] = React.useState(false);
  const [hasLinkBeenResent, setHasLinkBeenResent] = React.useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAuth.put("/verify", {
        otp,
        email,
      });
      toast.success("Account verified", toastSuccessConfig);
      router.push(`/${data?.user?.username}`);
    } catch (error: any) {
      if (error?.response?.data?.message.includes("expired"))
        setHasLinkExpired(true);

      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong",
        toastErrorConfig
      );
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await axios.post("/auth/resend-verification", {
        email,
      });
      toast.success("Verification link sent", toastSuccessConfig);
      setHasLinkBeenResent(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong",
        toastErrorConfig
      );
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setOtp(href.getQueryParam("otp"));
    setEmail(href.getQueryParam("email"));
  }, []);

  return (
    <AuthLayout
      pageName="Verify Account"
      hideFlyingThing
      text={
        hasLinkExpired
          ? hasLinkBeenResent
            ? "Link has been resent"
            : "Link has expired"
          : "Verify your account"
      }
      hideExtras
    >
      <div className="">
        {hasLinkExpired
          ? hasLinkBeenResent
            ? "A new link to verify your account has been sent to your email."
            : "Your verification link has expired, click the button below to request a new link."
          : "Click the button below to verify your account."}
      </div>
      {!hasLinkBeenResent && (
        <button
          className="bg-uf-accent text-uf-light mt-10 w-[300px] flex items-center justify-center h-[40px] font-semibold rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={hasLinkExpired ? handleResend : handleVerify}
          disabled={loading || !otp || !email}
        >
          {loading ? (
            <CgSpinner className="animate-spin" size={20} />
          ) : (
            <>{hasLinkExpired ? "Resend" : "Verify"}</>
          )}
        </button>
      )}
    </AuthLayout>
  );
};

export default VerifyAccount;
