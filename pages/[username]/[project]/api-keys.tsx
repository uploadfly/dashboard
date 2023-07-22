import CreateApiKey from "@/components/CreateApiKey";
import NoApiKeys from "@/components/NoApiKeys";
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
  const [showModal, setShowModal] = useState(false);

  const tableHeads = ["Name", "Key", "Permission", "Created", ""];
  return (
    <DashboardLayout
      isChildLoading={loading}
      childLoadingComponent={<></>}
      pageName="API Keys"
    >
      <CreateApiKey show={showModal} onClick={() => setShowModal(false)} />
      {keys.length === 0 ? (
        <NoApiKeys onClick={() => setShowModal(true)} />
      ) : (
        <div className="">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                {tableHeads.map((head, index) => (
                  <th
                    className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    key={index}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApiKeys;
