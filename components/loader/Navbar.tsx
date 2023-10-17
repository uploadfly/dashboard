import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const NavbarLoader = () => {
  return (
    <div className="sticky top-0 z-50 bg-uf-dark">
      <div className="flex items-center px-10 py-4 justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            width={40}
            height={40}
            alt="UploadFly logo"
          />
          <div className="w-32 h-4 loading-animation"></div>
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
          <div className="w-10 h-10 loading-animation rounded-full p-[2px]"></div>
        </div>
      </div>
      <div className="bg-uf-accent w-full h-[2px] opacity-50"></div>
    </div>
  );
};

export default NavbarLoader;
