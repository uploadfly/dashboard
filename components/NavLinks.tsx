import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiSquares2X2,
  HiFolderOpen,
  HiKey,
  HiShieldCheck,
  HiCog8Tooth,
} from "react-icons/hi2";
import { RiPieChart2Fill } from "react-icons/ri";

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
    {
      name: "Usage & Analytics",
      path: "/usage-analytics",
      icon: <RiPieChart2Fill />,
    },
    {
      name: "API Keys",
      path: "/api-keys",
      icon: <HiKey />,
    },
    {
      name: "Rules",
      path: "/rules",
      icon: <HiShieldCheck />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <HiCog8Tooth />,
    },
  ];

  const { user } = useUserStore();

  return (
    <div className="px-10">
      <div className={loading ? "pointer-events-none" : "flex gap-12"}>
        {links.map((link, i) => {
          const href = `/${user?.username}/${flyName}${link.path}`;
          return (
            <Link
              href={user && flyName ? href : ""}
              key={i}
              className={`flex items-center ${
                currentRoute === link.path ? "" : "bg-transparent"
              } p-3 rounded-md hover:bg-gray-600 transition-colors duration-500`}
            >
              <div className="">{link.icon}</div>
              <span className="ml-2">{link.name}</span>
            </Link>
          );
        })}
      </div>
      <div
        className="h-1 bg-uf-accent"
        style={{
          width: ``,
        }}
      ></div>
    </div>
  );
};

export default NavLinks;
