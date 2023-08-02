import CreateFirstFly from "@/components/CreateFirstFly";
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

  const [loading, setLoading] = useState<boolean>(true);

  const [flies, setFlies] = useState<any[]>([]);

  useEffect(() => {
    const getFlies = async () => {
      const res = await axios("/fly");
      setFlies(res?.data || []);
      setLoading(false);
    };
    getFlies();
  }, []);

  return (
    <div className="w-full bg-uf-dark h-screen text-uf-light">
      <Head>
        <title>{user?.username} | Overview</title>
      </Head>
      <Navbar />
      {flies.length > 0 || loading ? (
        <div className="mt-8 flex justify-between w-full gap-3 items-center px-10">
          <input
            type="text"
            className="bg-transparent border border-gray-800 rounded-md pl-3 lg:w-[450px] w-full py-2 outline-uf-accent"
            placeholder="Search for a fly"
          />
          <Link href={"/launch"} className="">
            <button className="flex gap-2 bg-uf-light hover:bg-uf-accent text-uf-dark rounded-md py-2 px-4 w-full items-center justify-center font-semibold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed">
              <HiOutlineRocketLaunch className="hidden lg:block text-xl group-hover:rotate-[360deg] transition-all duration-500" />
              <HiPlus className="lg:hidden text-xl group-hover:rotate-[360deg] transition-all duration-500" />
              <span className="hidden lg:block">Create a new fly</span>
            </button>
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col items-center w-screen px-5 lg:px-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 w-full mt-12">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div className="w-full">
            {!flies.length ? (
              <CreateFirstFly />
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardIndex;
