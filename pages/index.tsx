import React, { KeyboardEvent, useEffect, useState } from "react";

const Index = () => {
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
            <h1 className="shiny-text text-3xl">Welcome back</h1>
            <p className="text-center font-semibold text-gray-400">{`Let's fly`}</p>
          </div>
          <form className="flex flex-col gap-8 z-40">
            <input
              type="text"
              className="input"
              placeholder="What's your email?"
            />
            <input
              type="password"
              className="input"
              placeholder="Shh...it's a secret"
            />
            <button className="uf-gradient w-full rounded-md py-2 text-[#1e1e1e] font-bold hover:scale-105 transition-all">
              <span className="shadow-2xl">Login</span>
            </button>
          </form>
          <div className="mt-7 flex items-center gap-4 flex-col">
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
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
      <div
        className={`bg-uf-dark h-full w-full absolute top-0 flex justify-center items-center flex-col z-50 ${
          hide && "-translate-y-[200%]"
        } transition-all duration-1000`}
      >
        <div className="magicpattern pointer-events-none absolute opacity-10 animate-opacity"></div>
        <div className="absolute opacity-70 scale-[200%] pointer-events-none flex items-center flex-wrap w-56 justify-center left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
          <div className="h-28 w-28 rounded-full blur-2xl bg-[#0083cb]"></div>
          <div className="h-28 w-28 rounded-full blur-2xl bg-[#a06eac]"></div>
          <div className="h-28 w-28 rounded-full blur-2xl bg-[#ffb564]"></div>
        </div>
        <small className="bg-[rgba(255,255,255,0.1)] border-[1px] border-solid rounded-md px-2">
          Beta ✧･ﾟ
        </small>
        <div className="w-24 h-24 mt-4 bg-uf-light rounded-xl p-4 flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-icon/kite_318-572724.jpg"
            alt="logo"
            className="w-20 drop-shadow-2xl"
          />
        </div>
        <h1 className="text-5xl mt-10">
          File uploads that{" "}
          <span className="font-semibold shiny-text">fly</span>
        </h1>
        <p
          className="text-xl  font-semibold mt-10 flex items-center"
          role="button"
          onClick={() => setHide(true)}
        >
          Press enter to to begin
          <span className="ml-2 animate-flow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Index;
