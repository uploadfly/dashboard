import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

const Domains = () => {
  const { fly } = useFlyStore();
  const [domainName, setDomainName] = useState("");

  const requestCertificate = async () => {
    try {
      const { data } = await axios.post(
        `/project/${fly.id}/custom-domain/certificate`,
        { domainName }
      );
      toast.success(data.message, toastSuccessConfig);
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong.",
        toastErrorConfig
      );
    }
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <SettingsLayout>
      <h1 className="font-semibold text-2xl">Add a custom domain name</h1>
      <p className="text-sm mt-1">
        Ditch{" "}
        <span>
          <code className="text-uf-accent">cdn.uploadfly.cloud</code>
        </span>{" "}
        serve your files at your own domain.
      </p>
      {showForm ? (
        <div className="flex items-center gap-5 mt-5">
          <input
            type="text"
            className="py-2 pl-2 rounded-md w-[300px]"
            onChange={(e) => setDomainName(e.target.value.toLowerCase())}
            value={domainName}
          />
          <button
            className="flex items-center bg-uf-accent text-uf-light rounded-md px-5 py-2 font-semibold"
            onClick={requestCertificate}
          >
            <BiPlus />
            Add domain
          </button>
        </div>
      ) : (
        <button
          className="flex items-center bg-uf-accent text-uf-light rounded-md px-5 py-2 font-semibold mt-4"
          onClick={() => setShowForm(!showForm)}
        >
          <BiPlus />
          Add domain
        </button>
      )}
    </SettingsLayout>
  );
};

export default Domains;
