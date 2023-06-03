import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ApiKeys = () => {
  const [keys, setKeys] = useState<{ sk: string; pk: string }>({
    sk: "",
    pk: "",
  });

  const fetchKeys = async () => {
    try {
      const res = await axios.get("/api-keys");
      setKeys(res.data);
    } catch {
      setKeys({ sk: "", pk: "" });
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const regenerateKeys = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/api-keys/regenerate");
      setKeys(res.data.keys);
      toast("Keys successfully regenerate", toastSuccessConfig);
      setLoading(false);
    } catch (error) {
      toast("Error regenerating keys", toastErrorConfig);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <p className="mt-2 text-sm text-gray-400">
        View and manage your Uploadfly API keys
      </p>
      <div className="bg-[rgba(2255,255,255,.1)] mt-8 p-4 rounded-md">
        <div className="my-5">
          <h4>Public API Key</h4>
          <input
            type="text"
            placeholder="pk_eu5h*************************"
            className="input my-2"
            readOnly
            style={{
              width: "100%",
            }}
          />
          <p className="text-sm text-gray-400">
            Use this key for frontend services. This key can only be used to
            upload files.
          </p>
        </div>
        <div className="my-5">
          <h4>Secret API Key</h4>
          <input
            type="text"
            placeholder="sk_r3eq*************************"
            className="input my-2"
            readOnly
            style={{
              width: "100%",
            }}
          />
          <p className="text-sm text-gray-400">
            Use this key for secure backend services. This key gives you
            complete access to your Uploadfly cloud.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-uf-light text-uf-dark px-5 py-3 rounded-md font-semibold"
          onClick={regenerateKeys}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ${loading && "animate-spin"}`}
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clipRule="evenodd"
            />
          </svg>
          {loading ? "Regenerating" : "Regenerate"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ApiKeys;
