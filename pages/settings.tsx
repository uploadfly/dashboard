import AccountSettingsLayout from "@/layouts/AccountSettingsLayout";

const Settings = () => {
  return (
    <AccountSettingsLayout>
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="mt-5 flex gap-10 flex-col">
          <div className="w-full border-2 border-white/10 rounded-md py-5 px-5 flex flex-col items-start gap-6">
            <h2 className="text-xl font-semibold">Username</h2>
            <p className="text-sm">
              Your URL namespace within your Uploadfly dashboard.
            </p>
            <div className="flex items-center rounded-md border border-uf-accent/50 focus-within:border-uf-accent transition-colors px-3 py-2 w-[400px]">
              <p className="bg-uf-accent/20 p-2 rounded-md">
                beta.uploadfly.cloud/
              </p>
              <input
                type="text"
                className="w-full bg-transparent outline-none pl-1"
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm">
                Should be between 3 and 50 characters long.
              </p>
              <button className="bg-uf-accent/80 text-white px-5 py-2 rounded-md font-semibold">
                Update
              </button>
            </div>
          </div>
          <div className="w-full border-2 border-white/10 rounded-md py-5 px-5 flex flex-col items-start gap-6">
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-sm">Please enter your first or nick name.</p>
            <input
              type="text"
              className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md text-lg pl-3 py-2 w-[400px]"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm">
                Should be between 2 and 32 characters long.
              </p>
              <button className="bg-uf-accent/80 text-white px-5 py-2 rounded-md font-semibold">
                Update
              </button>
            </div>
          </div>
          <div className="w-full border-2 border-white/10 rounded-md py-5 px-5 flex flex-col items-start gap-6">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-sm">
              Enter the email address you want to use access your Uploadfly
              account.
            </p>
            <input
              type="text"
              className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md text-lg pl-3 py-2 w-[400px]"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm">We will require you to verify this.</p>
              <p className="bg-uf-accent/80 text-white px-5 py-2 rounded-md font-semibold">
                Save
              </p>
            </div>
          </div>
        </div>
      </div>
    </AccountSettingsLayout>
  );
};

export default Settings;
