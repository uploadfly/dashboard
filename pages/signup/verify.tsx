import AuthLayout from "@/layouts/AuthLayout";
import useHref from "use-href";
import React from "react";
import { axiosAuth } from "@/configs/axios";
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
      text="Verify your account"
      hideExtras
    >
      <div className="">Click the button below to verify your account.</div>
      <button
        className="bg-uf-accent text-uf-light mt-10 w-[300px] flex items-center justify-center h-[40px] font-semibold rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleVerify}
        disabled={loading || !otp || !email}
      >
        {loading ? (
          <CgSpinner className="animate-spin" size={20} />
        ) : (
          "Verify Account"
        )}
      </button>
    </AuthLayout>
  );
};

export default VerifyAccount;
