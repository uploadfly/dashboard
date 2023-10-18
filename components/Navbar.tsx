import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useEffect } from "react";
import NavbarLoader from "./loader/Navbar";
import Profile from "./Profile";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useFlyStore } from "@/stores/flyStore";
import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import SwitchFly from "./Navbar/SwitchFly";
import { axios } from "@/configs/axios";

const Navbar = () => {
  const router = useRouter();

  const { user, setUser } = useUserStore();
  const { fly } = useFlyStore();

  useEffect(() => {
    if (user) return;

    (async () => {
      const { data } = await axios("/user");
      setUser(data);
    })();
  }, []);

  return (
    <div className="sticky top-0 z-50 h-[120px]">
      {!user ? (
        <>
          <NavbarLoader />
        </>
      ) : (
        <div className="z-50 bg-uf-dark/70 backdrop-blur-md">
          <>
            <div className="flex items-center lg:px-10 px-3 py-4 justify-between">
              <div className="flex items-center lg:gap-5 gap-2">
                <Image
                  src={"/logo.svg"}
                  width={40}
                  height={40}
                  alt="UploadFly logo"
                />
                <Link href={`/${user?.username}`}>{user?.username}</Link>{" "}
                {fly?.name && router?.asPath.includes(fly?.name) && (
                  <>
                    <span className="text-uf-accent/80">/</span>{" "}
                    <p>{fly?.name}</p>
                    {/* <SwitchFly /> */}
                  </>
                )}
              </div>

              <div className="flex gap-4 items-center">
                <Link
                  href={"https://docs.uploadfly.co"}
                  target="_blank"
                  className="hover:text-uf-accent transition-colors flex items-center gap-1"
                >
                  Docs
                  <HiOutlineExternalLink />
                </Link>
                <Profile />
              </div>
            </div>
            {fly?.name && fly?.id && router?.asPath.includes(fly?.name) && (
              <div className="sticky top-0">
                <NavLinks loading={user?.username ? false : true} />
              </div>
            )}
          </>
          <div className="bg-uf-accent w-full h-[2px] opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
