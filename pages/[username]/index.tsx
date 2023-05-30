import FlyCard from "@/components/FlyCard";
import LoadingCard from "@/components/LoadingCard";
import Navbar from "@/components/Navbar";
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

  const [loading, setLoading] = useState<boolean>(true);

  const [flies, setFlies] = useState<any[]>([]);

  useEffect(() => {
    setCurrentUser(user);
    const getFlies = async () => {
      const res = await axios("/fly");
      setFlies(res?.data || []);
      setLoading(false);
      console.log(res);
    };
    getFlies();
  }, []);
  return (
    <div className="w-full bg-uf-dark h-screen text-uf-light">
      {/**NAVBAR */}
      <Navbar />

      <>
        {loading ? (
          <div className="flex gap-4 items-center justify-center mt-8 opacity-50">
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <>
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
                <div className="flex flex-col items-center">
                  <div className="flex gap-4 items-center justify-center mt-8">
                    {flies.map((fly) => {
                      return (
                        <FlyCard
                          key={fly.uuid}
                          name={fly.name}
                          used={fly.used_storage}
                          updated={fly.updated_at}
                          uuid={fly.uuid}
                        />
                      );
                    })}
                  </div>
                  <center className="mt-8 w-[250px]">
                    <Link href={"/launch"} className="w-full">
                      <button className="flex gap-2 bg-uf-light text-uf-dark rounded-md py-2 w-full items-center justify-center font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${loading && "animate-spin"}`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                          />
                        </svg>
                        Create a new fly
                      </button>
                    </Link>
                  </center>
                </div>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default DashboardIndex;
