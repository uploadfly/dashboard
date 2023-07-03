import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useEffect } from "react";
import NavbarLoader from "./loader/Navbar";
import Profile from "./Profile";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";

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
              <div className="flex items-center gap-5 font-semibold text-lg">
                <Image
                  src={"/logo.svg"}
                  width={40}
                  height={40}
                  alt="Uploadfly logo"
                />
                <p>{user?.username}</p>
              </div>

              <div className="flex gap-4 items-center">
                <Link
                  href={"https://docs.uploadfly.cloud"}
                  target="_blank"
                  className="hover:text-uf-accent transition-colors flex items-center gap-1"
                >
                  Docs
                  <HiOutlineExternalLink />
                </Link>
                <Profile />
              </div>
            </div>
            <div className="bg-uf-accent w-full h-[2px] opacity-50"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
