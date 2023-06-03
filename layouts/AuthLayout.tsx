import FlyingThing from "@/components/FlyingThing";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({
  children,
  text,
  type = "login",
  isOtpInputVisible = false,
}: {
  children: ReactNode;
  text: string;
  type?: "login" | "signup";
  isOtpInputVisible?: boolean;
}) => {
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

  const loginWithGithub = async () => {
    window.open(`${process.env.NEXT_PUBLIC_AUTH_URL}/github`, "_self");
  };

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
          <div className="mb-8">
            <h1 className="shiny-text text-3xl">{text}</h1>
            <p className="text-center font-semibold text-gray-400">{`Let's fly`}</p>
          </div>
          {children}
          {!isOtpInputVisible && (
            <>
              <div className="mt-4 flex justify-start w-[380px] gap-2 font-semibold">
                <p>
                  {type === "login"
                    ? "New to Uploadfly?"
                    : "Already have an account?"}
                </p>
                <Link href={type === "login" ? "/signup" : "/login"}>
                  {type === "login" ? "Signup" : "Login"}
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-4 flex-col">
                <p>or</p>
                <button
                  className="flex gap-2 bg-uf-light text-uf-dark rounded-md py-2 w-[380px] items-center justify-center font-bold hover:scale-105 transition-all"
                  onClick={loginWithGithub}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/**Flying thing */}
      <FlyingThing hide={hide} setHide={() => setHide(true)} />
    </div>
  );
};

export default AuthLayout;
