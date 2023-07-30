import DeleteModal from "@/components/Settings/DeleteModal";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useState } from "react";

const Advanced = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SettingsLayout>
      <DeleteModal show={showModal} onClick={() => setShowModal(false)} />
      <div className="flex items-center lg:gap-32 lg:flex-row flex-col">
        <div className="">
          <h1 className="font-semibold">Delete fly</h1>
          <p className="text-sm text-gray-400">
            This cannot be undone or restored. Make sure you really want to do
            this.
          </p>
        </div>
        <button
          className="border border-red-600 px-16 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors lg:w-fit w-full lg:mt-0 mt-3"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>
    </SettingsLayout>
  );
};

export default Advanced;
