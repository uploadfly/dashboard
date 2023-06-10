import { useFlyStore } from "@/stores/flyStore";
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

const Sidebar = () => {
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
      icon: () => <HiSquares2X2 />,
    },
    {
      name: "Files",
      path: "/files",
      icon: () => <HiFolderOpen />,
    },
    {
      name: "API Keys",
      path: "/api-keys",
      icon: () => <HiKey />,
    },
    {
      name: "Rules",
      path: "/rules",
      icon: () => <HiShieldCheck />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: () => <HiCog8Tooth />,
    },
  ];

  const { user } = useUserStore();

  return (
    <div>
      {links.map((link, i) => (
        <Link
          href={`/${user?.username}/${flyName}${link.path}`}
          key={i}
          className={`flex items-center ${
            currentRoute === link.path ? "bg-gray-600" : "bg-transparent"
          } h-12 rounded-md mb-6 hover:bg-gray-600 transition-colors duration-500`}
        >
          <div
            className={`bg-gradient-to-tr h-full w-[10px] mr-4 rounded-tl-md rounded-bl-md
            ${
              currentRoute === link.path &&
              "from-[#0083cb] via-[#a06eac] to-[#ffb564]"
            }
            `}
          ></div>
          <div className="text-xl">{link.icon()}</div>
          <span className="ml-2">{link.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
