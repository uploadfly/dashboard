import React from "react";

const Index = () => {
  return (
    <div className="bg-uf-dark h-screen text-uf-light">
      <div className="h-full w-full flex justify-center items-center flex-col">
        <small className="">Private Beta</small>
        <div className="w-24 h-24 mt-2 bg-white rounded-xl p-4 flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-icon/kite_318-572724.jpg"
            alt="logo"
            className="w-20 drop-shadow-2xl"
          />
        </div>
        <h1 className="text-4xl mt-10">
          File uploads that <span className="font-semibold">fly</span>
        </h1>
        <p className="text-lg font-semibold mt-10 flex items-center">
          Press enter to to begin
          <span className="ml-2 animate-flow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
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
