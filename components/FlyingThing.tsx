import React from "react";

const FlyingThing = ({
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: () => void;
}) => {
  return (
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
      <img
        src="/logo.svg"
        alt="logo"
        className="w-30 drop-shadow-2xl mb-6 mt-3"
      />
      <h1 className="text-5xl">
        File uploads that <span className="font-semibold shiny-text">fly</span>
      </h1>
      <p
        className="text-xl  font-semibold mt-10 flex items-center"
        role="button"
        onClick={() => setHide()}
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
  );
};

export default FlyingThing;
