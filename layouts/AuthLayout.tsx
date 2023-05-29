import FlyingThing from "@/components/FlyingThing";
import React, { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [hide, setHide] = useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    e.key === "Enter" && setHide(true);
  };

  useEffect(() => {
    const handleKeyDown: EventListener = (e: Event) => {
      handleKeyPress(e as unknown as KeyboardEvent);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    //Written by ChatGPT
    //Modified by @xing0x
  }, []);
  return (
    <div className="bg-uf-dark relative h-screen text-uf-light overflow-x-hidden">
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div className="flex flex-col relativeitems-center justify-center bg-[#050505] w-[35%] h-full">
          <div
            className="animate-breath absolute pointer-events-none flex items-center flex-wrap w-56 justify-center translate-x-[50%] top-[50%] translate-y-[-50%]
      "
          >
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#0083cb]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#a06eac]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#ffb564]"></div>
          </div>
        </div>
        <div className="flex-col w-[65%] h-full flex relative items-center justify-center">
          <div className="h-full w-full absolute magicpattern animate-opacity pointer-events-none"></div>
          {children}
        </div>
      </div>

      {/**Flying thing */}
      <FlyingThing hide={hide} setHide={() => setHide(true)} />
    </div>
  );
};

export default AuthLayout;
