import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiInfoCircle, BiPlus } from "react-icons/bi";

const Domains = () => {
  const { fly } = useFlyStore();
  const [domainName, setDomainName] = useState("");
  const [hasCertificateBeenRequested, setHasCertificateBeenRequested] =
    useState(false);
  const [dnsRecord, setDnsRecord] = useState<{
    DNS: { name: string; value: string; validation_status: string };
  } | null>(null);

  const fetchDNSRecords = async () => {
    try {
      const { data } = await axios(
        `/project/${fly.id}/custom-domain/certificate`
      );
      setDnsRecord(data);
    } catch (error) {
      // toast("Failed to fetch DNS record.", toastErrorConfig);
    }
  };

  const requestCertificate = async () => {
    try {
      const { data } = await axios.post(
        `/project/${fly.id}/custom-domain/certificate`,
        { domainName }
      );
      toast.success(data.message, toastSuccessConfig);
      setHasCertificateBeenRequested(true);
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong.",
        toastErrorConfig
      );
    }
  };

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (fly.id) fetchDNSRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fly.id]);

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
      <>
        {!dnsRecord && (
          <>
            {!hasCertificateBeenRequested && (
              <>
                {showForm ? (
                  <div className="flex items-center gap-5 mt-5">
                    <input
                      type="text"
                      className="py-2 pl-2 rounded-md w-[300px]"
                      onChange={(e) =>
                        setDomainName(e.target.value.toLowerCase())
                      }
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
              </>
            )}
          </>
        )}
        {hasCertificateBeenRequested && !dnsRecord && (
          <div className="mt-4">
            <h2>Domain name has been added.</h2>
            <button
              className="flex items-center bg-uf-accent text-uf-light rounded-md px-5 py-2 font-semibold mt-1"
              onClick={fetchDNSRecords}
            >
              Generate DNS entries
            </button>
          </div>
        )}

        {dnsRecord && (
          <div className="mt-5 border border-green-500 bg-green-500/20 rounded-md p-3">
            <p className="flex items-center gap-2">
              <BiInfoCircle />{" "}
              <span className="">DNS Validation Is Required.</span>
            </p>
            <p className="text-sm mt-1">
              Add the following DNS entries to configure the custom domain.
            </p>
            <table className="table-auto border-separate border-spacing-4">
              <thead>
                <tr>
                  <td>Type</td>
                  <td>Name</td>
                  <td>Value</td>
                  <td>Validation Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CNAME</td>
                  <td>cdn</td>
                  <td>d19172n4opxkkj.cloudfront.net.</td>
                  <td className="font-semibold">PENDING</td>
                </tr>
                <tr>
                  <td>CNAME</td>
                  <td>{dnsRecord.DNS.name}</td>
                  <td>{dnsRecord.DNS.value}</td>
                  <td className="font-semibold">
                    {dnsRecord.DNS.validation_status.split("_")[0]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </>
    </SettingsLayout>
  );
};

export default Domains;
