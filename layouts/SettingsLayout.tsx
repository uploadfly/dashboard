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
    // {
    //   title: "Billing and Plans",
    //   route: "/billing-plans",
    // },
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

  const currentRoute = router.pathname.split("/")[4]
    ? `/${router.pathname.split("/")[4]}`
    : "/";

  return (
    <DashboardLayout pageName="Settings">
      <div className="flex lg:flex-row flex-col">
        <div className={`flex flex-col lg:gap-5 gap-2`}>
          {subSettingsPages.map((page) => {
            return (
              <Link
                href={`${baseRoute}${page.route}`}
                key={page.title}
                className={`${
                  currentRoute === page.route
                    ? "text-uf-accent font-semibold"
                    : "text-gray-500"
                }`}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
        <div className="lg:ml-28 lg:mt-0 mt-8">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsLayout;
