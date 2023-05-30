import FlyCard from "@/components/FlyCard";
import { axios } from "@/configs/axios";
import { useUserStore } from "@/stores/userStore";
import { Card, Metric } from "@tremor/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardIndex = () => {
  const { user } = useUserStore();
  const [currentUser, setCurrentUser] = useState<{ username: string }>({
    username: "",
  });

  const [flies, setFlies] = useState<any[]>([]);

  useEffect(() => {
    setCurrentUser(user);

    const getFlies = async () => {
      const res = await axios("/api/fly");
      setFlies(res.data);
      console.log(res);
    };
    getFlies();
  }, []);
  return (
    <div className="w-full bg-uf-dark h-screen text-uf-light">
      <div className="flex items-center px-10 py-4  justify-between">
        <h1 className="shiny-text text-xl">uploadfly</h1>
        <div className="flex gap-4 items-center">
          <p>{currentUser?.username}</p>
          <Link
            href={"https://docs.uploadfly.io"}
            target="_blank"
            className="font-semibold text-gray-300"
          >
            Docs
          </Link>
          <div className="">
            <div
              className="w-10 h-10 uf-gradient rounded-full p-[2px]"
              role="button"
            >
              <img
                src="https://avatars.githubusercontent.com/u/54487532?v=4"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="uf-gradient w-full h-[2px] opacity-70"></div>

      <div className="flex items-center flex-col">
        {!flies.length ? (
          <>
            <h1 className="shiny-text font-semibold text-center text-5xl mt-8">
              Welcome to the cloud
            </h1>
            <p className="text-center mt-3 text-gray-300 text-xl font-semibold">
              You're ready to create your first fly.
            </p>

            <h1 className="text-9xl my-16">⛈️</h1>

            {/* <small className="text-center">Here, projects a called flies</small> */}

            <Link href={"/launch"}>
              <button className="border-[1px] rounded-md font-semibold w-[300px] text-xl h-[50px]">
                <span className="shiny-text">Create your fly</span>
              </button>
            </Link>
          </>
        ) : (
          <div className="flex gap-4 items-center justify-center mt-8">
            {flies.map((fly) => {
              return (
                <FlyCard
                  key={fly.uuid}
                  name={fly.name}
                  used={fly.used_storage}
                  updated={fly.updated_at}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardIndex;
