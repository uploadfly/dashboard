import FlyCard from "@/components/FlyCard";
import LoadingCard from "@/components/LoadingCard";
import Navbar from "@/components/Navbar";
import { axios } from "@/configs/axios";
import { useUserStore } from "@/stores/userStore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineRocketLaunch, HiPlus } from "react-icons/hi2";

const DashboardIndex = () => {
  const { user } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);

  const [flies, setFlies] = useState<any[]>([
    {
      name: "wooo",
      uuid: "1f263da6-d689-4c7a-86fb-60454fd52ee9",
      used_storage: 313351,
      updated_at: "2023-07-29T01:13:56.709Z",
      storage: 2000000000,
    },
    {
      name: "wooo",
      uuid: "1f263da6-dj49-4c7a-86fb-60454fd52ee9",
      used_storage: 323351,
      updated_at: "2023-07-29T01:13:56.709Z",
      storage: 2000000000,
    },
  ]);

  // useEffect(() => {
  //   const getFlies = async () => {
  //     const res = await axios("/fly");
  //     setFlies(res?.data || []);
  //     setLoading(false);
  //   };
  //   getFlies();
  // }, []);

  return (
    <div className="w-full bg-uf-dark h-screen text-uf-light">
      <Head>
        <title>{user?.username} | Overview</title>
      </Head>
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
              ) : (
                <div className="flex flex-col items-center w-screen px-5 lg:px-10">
                  <div className="mt-8 flex justify-between w-full gap-3 items-center">
                    <input
                      type="text"
                      className="bg-transparent border border-gray-800 rounded-md pl-3 lg:w-[450px] w-full py-2 outline-uf-accent"
                      placeholder="Search for a fly"
                    />
                    <Link href={"/launch"} className="">
                      <button className="flex gap-2 bg-uf-light hover:bg-uf-accent text-uf-dark rounded-md py-2 px-4 w-full items-center justify-center font-semibold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed">
                        <HiOutlineRocketLaunch className="hidden lg:block text-xl group-hover:rotate-[360deg] transition-all duration-500" />
                        <HiPlus className="lg:hidden text-xl group-hover:rotate-[360deg] transition-all duration-500" />
                        <span className="hidden lg:block">
                          Create a new fly
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 w-full mt-12">
                    {flies.map((fly) => {
                      return (
                        <FlyCard
                          key={fly.uuid}
                          name={fly.name}
                          used={fly.used_storage}
                          updated={fly.updated_at}
                          uuid={fly.uuid}
                          storage={fly.storage}
                        />
                      );
                    })}
                  </div>
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
