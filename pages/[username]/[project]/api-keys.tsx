import CreateApiKey from "@/components/CreateApiKey";
import NoApiKeys from "@/components/NoApiKeys";
import ApiKeysLoader from "@/components/loader/ApiKeys";
import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoEllipsisVertical } from "react-icons/io5";

export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
// Written by Amazon CodeWhisperer

export interface KeyProps {
  name: string;
  uuid: string;
  key: string;
  permission: string;
  created_at: string;
}

const ApiKeys = () => {
  const [keys, setKeys] = useState<KeyProps[]>([]);
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
  const { fly } = useFlyStore();

  useEffect(() => {
    if (fly?.uuid) {
      fetchKeys();
    }
  }, [fly?.uuid]);

  const [showModal, setShowModal] = useState(false);

  const tableHeads = ["Name", "Key", "Permission", "Created", ""];

  const handleNewKey = (newKeyData: KeyProps) => {
    setKeys((prevKeys) => [...prevKeys, newKeyData]);
  };

  return (
    <DashboardLayout
      isChildLoading={loading}
      childLoadingComponent={<></>}
      pageName="API Keys"
    >
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Create key
      </button>
      <CreateApiKey
        show={showModal}
        onClick={() => setShowModal(false)}
        onKeyCreated={handleNewKey}
      />
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
            <tbody className="">
              {keys.map((key) => (
                <tr key={key.uuid}>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {key.name}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {key.key}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {key.permission} access
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {moment(key.created_at).fromNow()}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    <div className="dropdown">
                      <IoEllipsisVertical />
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>Edit key</li>
                        <li>Delete key</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApiKeys;
