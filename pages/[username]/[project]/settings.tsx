import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import Link from "next/link";

const Settings = () => {
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
  return (
    <DashboardLayout pageName="Settings">
      <div className="">
        <div className={`flex flex-col gap-5`}>
          {subSettingsPages.map((page) => (
            <Link
              href={`${window.location.origin}/${fly?.name}/settings${page.route}`}
              key={page.title}
            >
              {page.title}
            </Link>
          ))}
        </div>
        <div className=""></div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
