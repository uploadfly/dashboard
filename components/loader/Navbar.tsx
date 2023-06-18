import Link from "next/link";

const NavbarLoader = () => {
  return (
    <div className="sticky top-0 z-50 bg-uf-dark">
      <div className="flex items-center px-10 py-4  justify-between">
        <h1 className="shiny-text text-xl">uploadfly</h1>
        <div className="flex gap-4 items-center">
          <div className="h-5 w-40 loading"></div>
          <Link
            href={"https://docs.uploadfly.io"}
            target="_blank"
            className="font-semibold text-gray-300"
          >
            Docs
          </Link>
          <div className="w-10 h-10 loading rounded-full p-[2px]"></div>
        </div>
      </div>
      <div className="uf-gradient w-full h-[2px] opacity-70"></div>
    </div>
  );
};

export default NavbarLoader;
