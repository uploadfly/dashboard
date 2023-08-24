import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const AccountSettingsLayout = ({ children }: { children: ReactNode }) => {
  const links = [
    {
      title: "Account",
      href: "/settings",
    },
  ];
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Settings | Uploadfly </title>
      </Head>
      <Navbar />
      <div className="flex lg:flex-row flex-col lg:px-20 px-5 py-10">
        <div className="flex flex-col lg:gap-5 gap-2">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`${
                router?.pathname === link.href ? "text-uf-accent" : ""
              } font-semibold`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="lg:ml-28 lg:mt-0 mt-8 w-full">{children}</div>
      </div>
    </>
  );
};

export default AccountSettingsLayout;
