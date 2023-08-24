import Card from "@/components/AccountSettings/Card";
import AccountSettingsLayout from "@/layouts/AccountSettingsLayout";
import { useUserStore } from "@/stores/userStore";

const Settings = () => {
  const { user } = useUserStore();
  return (
    <AccountSettingsLayout>
      <div>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <div className="mt-5 flex gap-10 flex-col">
          <Card
            title="Username"
            description=" Your URL namespace within your Uploadfly dashboard."
            subtext="Should be between 3 and 50 characters long."
          >
            <div className="flex items-center rounded-md border border-uf-accent/50 focus-within:border-uf-accent transition-colors lg:w-[400px] w-full">
              <p className="bg-uf-accent/20 p-2 rounded-md">
                beta.uploadfly.cloud/
              </p>
              <input
                type="text"
                className="w-full bg-transparent outline-none pl-1"
                defaultValue={user?.username}
              />
            </div>
          </Card>
          <Card
            title="Name"
            description="Please enter your first or nick name."
            subtext="Should be between 2 and 32 characters long."
          >
            <input
              type="text"
              className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md pl-3 py-2 lg:w-[400px] w-full"
            />
          </Card>
          <Card
            title="Email"
            description="Enter the email address you want to use access your Uploadfly."
            subtext="We will require you to verify this."
          >
            <input
              type="text"
              className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md pl-3 py-2 lg:w-[400px] w-full"
              defaultValue={user?.email}
            />
          </Card>
        </div>
      </div>
    </AccountSettingsLayout>
  );
};

export default Settings;
