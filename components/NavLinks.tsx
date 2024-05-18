import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiSquares2X2,
  HiFolderOpen,
  HiKey,
  HiCog8Tooth,
  HiQueueList,
} from "react-icons/hi2";

const NavLinks = ({ loading }: { loading: boolean }) => {
  const router = useRouter();

  const [currentRoute, setCurrentRoute] = useState("");
  const [flyName, setFlyName] = useState("");

  useEffect(() => {
    const route = router.pathname.split("/")[3];
    setCurrentRoute(route ? `/${route}` : "/");
    setFlyName(window.location.pathname.split("/")[2]);
  }, [router?.pathname]);

  const links = [
    {
      name: "Overview",
      path: "/",
      icon: <HiSquares2X2 />,
    },
    {
      name: "Files",
      path: "/files",
      icon: <HiFolderOpen />,
    },
    // {
    //   name: "Usage & Analytics",
    //   path: "/usage-analytics",
    //   icon: <RiPieChart2Fill />,
    // },
    {
      name: "Logs",
      path: "/logs",
      icon: <HiQueueList />,
    },
    {
      name: "API Keys",
      path: "/api-keys",
      icon: <HiKey />,
    },
    // {
    //   name: "Rules",
    //   path: "/rules",
    //   icon: <HiShieldCheck />,
    // },
    {
      name: "Settings",
      path: "/settings",
      icon: <HiCog8Tooth />,
    },
  ];

  const { user } = useUserStore();

  const billingRoute = router.pathname.split("/")[4];

  return (
    <div className="lg:px-10 px-5 w-full overflow-x-auto flex items-center justify-between">
      <div className={loading ? "pointer-events-none" : "flex gap-12 mt-3"}>
        {links.map((link, i) => {
          const href = `/${user?.username}/${flyName}${link.path}`;
          return (
            <Link
              href={user && flyName ? href : ""}
              key={i}
              passHref
              legacyBehavior
            >
              <a
                className={`flex whitespace-nowrap items-center ${
                  currentRoute === link.path
                    ? "border-uf-accent"
                    : "border-transparent hover:border-uf-accent/40"
                } pb-2 lg:px-4  border-b-4 transition-colors duration-500`}
              >
                <div className="">{link.icon}</div>
                <span className="ml-2 text-center">{link.name}</span>
              </a>
            </Link>
          );
        })}
      </div>

      {!router.asPath.includes("plans") && (
        <Link
          href={`/${user?.username}/${flyName}/settings/billing-plans`}
          className="bg-uf-accent rounded-md py-2 px-10 flex items-center justify-center text-white font-semibold transition-all"
        >
          Choose a plan
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
