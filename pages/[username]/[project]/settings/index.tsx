import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const Settings = ({ children }: { children: ReactNode }) => {
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
  const router = useRouter();

  const [baseRoute, setBaseRoute] = useState("");

  useEffect(() => {
    setBaseRoute(`${window?.location.origin}/${fly?.name}/settings`);
  }, [fly]);
  return (
    <DashboardLayout pageName="Settings">
      <div className="">
        <div className={`flex flex-col gap-5`}>
          {subSettingsPages.map((page) => (
            <Link href={`${baseRoute}${page.route}`} key={page.title}>
              {page.title}
            </Link>
          ))}
        </div>
        <div className="">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
