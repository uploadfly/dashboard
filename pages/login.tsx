import React from "react";

const Login = () => {
  const loginWithGithub = async () => {
    window.open("http://localhost:1112/github", "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Login bro</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={loginWithGithub}
      >
        Loign with GitHub
      </button>
    </div>
  );
};

export default Login;
