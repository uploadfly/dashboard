import SettingsLayout from "@/layouts/SettingsLayout";

const Advanced = () => {
  return (
    <SettingsLayout>
      <div className="flex items-center gap-32">
        <div className="">
          <h1 className="font-semibold">Delete fly</h1>
          <p className="text-sm text-gray-400">
            This cannot be undone or restored. Make sure you really want to do
            this.
          </p>
        </div>
        <button className="border border-red-600 px-16 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors">
          Delete
        </button>
      </div>
    </SettingsLayout>
  );
};

export default Advanced;
