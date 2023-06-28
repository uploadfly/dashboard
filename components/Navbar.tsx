import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useEffect } from "react";
import NavbarLoader from "./loader/Navbar";
import Profile from "./Profile";
import Image from "next/image";

const Navbar = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser();
  }, []);

  return (
    <>
      {!user ? (
        <>
          <NavbarLoader />
        </>
      ) : (
        <>
          <div className="sticky top-0 z-50 bg-uf-dark">
            <div className="flex items-center px-10 py-4 justify-between">
              <Image
                src={"/logo.svg"}
                width={40}
                height={40}
                alt="Uploadfly logo"
              />
              <div className="flex gap-4 items-center">
                <p>{user?.username}</p>
                <Link
                  href={"https://docs.uploadfly.io"}
                  target="_blank"
                  className="font-semibold text-gray-300"
                >
                  Docs
                </Link>
                <Profile />
              </div>
            </div>
            <div className="uf-gradient w-full h-[2px] opacity-70"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
