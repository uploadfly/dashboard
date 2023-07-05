import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const { fly } = useFlyStore();
  const subSettingsPages = [
    {
      title: "General",
      route: "/",
    },
    {
      title: "Billing and Plans",
      route: "/billing-plans",
    },
    {
      title: "Advanced",
      route: "/advanced",
    },
  ];

  const [baseRoute, setBaseRoute] = useState("");
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const base =
      user && fly
        ? `${window.location.origin}/${user.username}/${fly.name}`
        : "";
    setBaseRoute(`${base}/settings`);
  }, [fly, user]);

  return (
    <DashboardLayout pageName="Settings">
      <div className="flex">
        <div className={`flex flex-col gap-5`}>
          {subSettingsPages.map((page) => {
            return (
              <Link href={`${baseRoute}${page.route}`} key={page.title}>
                {page.title}
              </Link>
            );
          })}
        </div>
        <div className="ml-28">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsLayout;
