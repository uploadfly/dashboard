import CreateApiKey from "@/components/CreateApiKey";
import DeleteApiKey from "@/components/DeleteApiKey";
import NoApiKeys from "@/components/NoApiKeys";
import ApiKeysLoader from "@/components/loader/ApiKeys";
import { axios } from "@/configs/axios";
import { KeyProps } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi2";

// Written by Amazon CodeWhisperer

const ApiKeys = () => {
  const [keys, setKeys] = useState<KeyProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchKeys = async () => {
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
    if (fly?.id) {
      fetchKeys();
    }
  }, [fly?.id]);

  const [showModal, setShowModal] = useState(false);

  const tableHeads = ["Name", "Key", "Permission", "Created", ""];

  const handleNewKey = (newKeyData: KeyProps) => {
    setKeys((prevKeys) => {
      prevKeys.unshift(newKeyData);
      return [...prevKeys];
    });
  };

  const [key, setKey] = useState<KeyProps | null>(null);

  return (
    <DashboardLayout
      isChildLoading={loading}
      childLoadingComponent={<></>}
      pageName="API Keys"
      button={
        <>
          {keys.length > 0 && (
            <button
              className="flex gap-2 bg-uf-light text-uf-dark items-center px-3 font-semibold py-2 rounded-md hover:bg-uf-accent hover:text-uf-dark transition-colors"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <HiPlus />
              Create a new key
            </button>
          )}
        </>
      }
    >
      <CreateApiKey
        show={showModal}
        onClick={() => setShowModal(false)}
        onKeyCreated={handleNewKey}
      />

      <DeleteApiKey
        keyObj={key}
        onClick={() => setKey(null)}
        onKeyDeleted={() => {
          const updatedKeys = keys.filter((k) => k.id !== key?.id);
          setKeys(updatedKeys);
          setKey(null);
        }}
      />

      {keys.length === 0 ? (
        <NoApiKeys onClick={() => setShowModal(true)} />
      ) : (
        <div className="overflow-auto">
          <table className="border-collapse table-auto w-full text-sm">
            <thead className="bg-uf-accent/10">
              <tr>
                {tableHeads.map((head, index) => (
                  <th
                    className="border-b border-uf-accent/80 font-medium py-2 text-uf-light text-left pl-5 whitespace-nowrap"
                    key={index}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {keys.map((key) => (
                <tr key={key.id}>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {key.name}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {key.key}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400 whitespace-nowrap">
                    {key.permission} access
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400 whitespace-nowrap">
                    {moment(key.created_at).fromNow()}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    <button
                      className="p-2 hover:bg-slate-200/10 rounded"
                      onClick={() => setKey(key)}
                    >
                      <HiTrash />
                    </button>
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
