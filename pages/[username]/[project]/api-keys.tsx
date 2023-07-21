import ApiKeysLoader from "@/components/loader/ApiKeys";
import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
// Written by Amazon CodeWhisperer

const ApiKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchKeys = async () => {
    setLoading(true);
    const flyName = window.location.pathname.split("/")[2];
    try {
      const { data } = await axios.get(`/api-keys?fly_name=${flyName}`);
      setKeys(data);
      setLoading(false);
    } catch (error) {
      setKeys([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const { fly } = useFlyStore();

  const [regenerating, setRegenerating] = useState<boolean>(false);

  const regenerateKeys = async () => {
    setRegenerating(true);
    try {
      const res = await axios.put("/api-keys/create", {
        fly_id: fly.uuid,
      });
      setKeys(res.data.keys);
      toast("Keys successfully regenerated", toastSuccessConfig);
      setRegenerating(false);
    } catch (error) {
      console.log(error);
      toast("Error regenerating keys", toastErrorConfig);
      setRegenerating(false);
    }
  };

  // const copyToClipboardPk = () => {
  //   copyToClipboard(keys?.pk);
  //   toast("Public API Key copied to clipboard", toastSuccessConfig);
  // };

  // const copyToClipboardSk = () => {
  //   copyToClipboard(keys?.sk);
  //   toast("Secret API Key copied to clipboard", toastSuccessConfig);
  // };

  return (
    <DashboardLayout
      isChildLoading={loading}
      childLoadingComponent={<ApiKeysLoader />}
      pageName="API Keys"
    >
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <p className="mt-2 text-sm text-gray-400">
        View and manage your Uploadfly API keys
      </p>
      {keys.length === 0 ? <>No keys</> : <>Keys</>}
    </DashboardLayout>
  );
};

export default ApiKeys;
