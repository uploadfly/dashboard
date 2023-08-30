import Card from "@/components/AccountSettings/Card";
import { axios } from "@/configs/axios";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import AccountSettingsLayout from "@/layouts/AccountSettingsLayout";
import { useUserStore } from "@/stores/userStore";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Settings = () => {
  const { user, setUser } = useUserStore();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [loadingId, setLoadingId] = useState(0);
  const [waitingForEmailVerification, setWaitingForEmailVerification] =
    useState(false);

  const updateUsername = async () => {
    try {
      setLoadingId(1);
      const { data } = await axios.patch("/me/update/username", { username });
      setUser({ ...user, username: data.username });
      toast("Username updated", toastSuccessConfig);
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong",
        toastErrorConfig
      );
    } finally {
      setLoadingId(0);
    }
  };

  const updateName = async () => {
    try {
      setLoadingId(2);
      const { data } = await axios.patch("/me/update/name", { name });

      //@ts-ignore
      setUser({ ...user, name: data.name });

      toast("Name updated", toastSuccessConfig);
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong",
        toastErrorConfig
      );
    } finally {
      setLoadingId(0);
    }
  };

  const updateEmail = async () => {
    try {
      setLoadingId(3);
      await axios.post("/me/update/email", { email });
      toast("Email sent, waiting for verification", toastSuccessConfig);
      setWaitingForEmailVerification(true);
    } catch (error: any) {
      toast(
        error.response.data.message || "Something went wrong",
        toastErrorConfig
      );
      setLoadingId(0);
    }
  };

  const settingsCards = [
    {
      id: 1,
      title: "Username",
      description: " Your URL namespace within your Uploadfly dashboard.",
      subtext: "Should be between 3 and 50 characters long.",
      component: (
        <div className="flex items-center rounded-md border border-uf-accent/50 focus-within:border-uf-accent transition-colors lg:w-[400px] w-full">
          <p className="bg-uf-accent/20 p-2 rounded-md">
            beta.uploadfly.cloud/
          </p>
          <input
            type="text"
            className="w-full bg-transparent outline-none pl-1"
            value={username}
            placeholder={user?.username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
        </div>
      ),
      disabled: !username || username === user?.username,
      onClick: updateUsername,
    },
    {
      id: 2,
      title: "Name",
      description: "Please enter your first or nick name.",
      subtext: "Should be between 2 and 32 characters long.",
      component: (
        <input
          type="text"
          className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md pl-3 py-2 lg:w-[400px] w-full"
          placeholder={user?.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      disabled: !name,
      onClick: updateName,
    },
    {
      id: 3,
      title: "Email",
      description:
        "Enter the email address you want to use access your Uploadfly.",
      subtext: waitingForEmailVerification
        ? "We sent you an email to verify your new email address..."
        : "We will require you to verify this.",
      component: (
        <input
          type="text"
          className="bg-transparent border border-uf-accent/30 focus:border-uf-accent/70 transition-colors outline-none rounded-md pl-3 py-2 lg:w-[400px] w-full"
          defaultValue={user?.email}
          onChange={(e) => setEmail(() => e.target.value.toLowerCase())}
        />
      ),
      disabled: !email || email === user?.email,
      onClick: updateEmail,
    },
  ];

  return (
    <AccountSettingsLayout>
      <div>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <div className="mt-5 flex gap-10 flex-col">
          {settingsCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              subtext={card.subtext}
              disabled={card.disabled}
              onClick={card.onClick}
              loading={loadingId === card.id}
            >
              {card.component}
            </Card>
          ))}
        </div>
      </div>
    </AccountSettingsLayout>
  );
};

export default Settings;
