import FlyCard from "@/components/FlyCard";
import LoadingCard from "@/components/LoadingCard";
import Navbar from "@/components/Navbar";
import { axios } from "@/configs/axios";
import { useUserStore } from "@/stores/userStore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

const DashboardIndex = () => {
  const { user } = useUserStore();

  const [loading, setLoading] = useState<boolean>(true);

  const [flies, setFlies] = useState<any[]>([]);

  useEffect(() => {
    const getFlies = async () => {
      const res = await axios("/fly");
      // setFlies(res?.data || []);
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
                    {`You are ready to create your first fly.`}
                  </p>

                  <Image
                    src={"./logo.svg"}
                    width={100}
                    height={100}
                    alt="Logo"
                    className="my-10 opacity-90"
                  />

                  <Link href={"/launch"}>
                    <button className="bg-uf-accent rounded-md font-semibold px-20 py-2 text-uf-light text-lg">
                      Create your fly
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center w-screen px-10">
                  <div className="mt-8 flex justify-between w-full">
                    <input
                      type="text"
                      className="bg-transparent border border-gray-800 rounded-md pl-3 w-[450px] outline-uf-accent"
                      placeholder="Search for a fly"
                    />
                    <Link href={"/launch"} className="">
                      <button className="flex gap-2 bg-uf-light hover:bg-uf-accent text-uf-dark rounded-md py-2 px-4 w-full items-center justify-center font-semibold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed">
                        <HiOutlineRocketLaunch className="text-xl group-hover:rotate-[360deg] transition-all duration-500" />
                        Create a new fly
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
