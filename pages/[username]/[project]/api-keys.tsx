import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const ApiKeys = () => {
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
      </div>
    </DashboardLayout>
  );
};

export default ApiKeys;
