import SettingsLayout from "@/layouts/SettingsLayout";
import { BiPlus } from "react-icons/bi";

const Domains = () => {
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
      <button className="flex items-center bg-uf-accent text-uf-light rounded-md px-5 py-2 font-semibold mt-4">
        <BiPlus />
        Add domain
      </button>
    </SettingsLayout>
  );
};

export default Domains;
