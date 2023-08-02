import Image from "next/image";
import Link from "next/link";
import React from "react";

const CreateFirstFly = () => {
  return (
    <div className="w-full px-5 flex flex-col items-center">
      <h1 className="shiny-text font-semibold text-center lg:text-5xl text-3xl lg:mt-8 mt-3">
        Welcome to the cloud
      </h1>
      <p className="text-center lg:mt-3 text-gray-300 lg:text-xl font-semibold">
        {`You are ready to create your first fly.`}
      </p>

      <div className="flex w-full items-center justify-center">
        <Image
          src={"./logo.svg"}
          width={100}
          height={100}
          alt="Logo"
          className="my-10 opacity-90"
        />
      </div>

      <Link href={"/launch"} className="w-full lg:w-fit">
        <button className="bg-uf-accent rounded-md font-semibold px-20 py-2 text-uf-light text-lg w-full lg:w-fit">
          Create your fly
        </button>
      </Link>
    </div>
  );
};

export default CreateFirstFly;
