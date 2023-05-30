import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();

  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const route = router.pathname.split("/")[3];
    setCurrentRoute(route ? `/${route}` : "/");
  }, [router?.pathname]);

  const links = [
    {
      name: "Overview",
      path: "/",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Files",
      path: "/files",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
        </svg>
      ),
    },
  ];
  return (
    <div>
      {links.map((link, i) => (
        <Link
          href={link.path}
          key={i}
          className={`flex items-center ${
            currentRoute === link.path ? "bg-gray-600" : "bg-transparent"
          } h-10 rounded-md mb-10 hover:bg-gray-600 transition-colors duration-500`}
        >
          <div
            className={`bg-gradient-to-tr h-full w-[10px] mr-4 rounded-tl-md rounded-bl-md
            ${
              currentRoute === link.path &&
              "from-[#0083cb] via-[#a06eac] to-[#ffb564]"
            }
            `}
          ></div>
          {link.icon()}
          <span className="ml-2">{link.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
