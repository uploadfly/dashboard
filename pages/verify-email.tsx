import { toastErrorConfig } from "@/configs/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useHref from "use-href";

const VerifyEmail = () => {
  const { getQueryParam } = useHref();
  const [token, setToken] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(getQueryParam("token"));
  }, []);

  const verify = async () => {
    setLoading(true);
    try {
      await axios.patch("api/me/verify-email", { token });
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong",
        toastErrorConfig
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-5xl font-semibold">Email change</h1>
      <p className="text-lg mt-2">
        Click the button below to verify your email change
      </p>
      <button
        className="bg-uf-accent text-white py-2 px-32 rounded-lg mt-10 hover:bg-uf-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!token}
        onClick={verify}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default VerifyEmail;
