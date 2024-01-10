import CreateFirstFly from "@/components/CreateFirstFly";
import FlyCard from "@/components/FlyCard";
import LoadingCard from "@/components/LoadingCard";
import Navbar from "@/components/Navbar";
import { axios } from "@/configs/axios";
import { useUserStore } from "@/stores/userStore";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineRocketLaunch, HiPlus } from "react-icons/hi2";
import { TbLockSquareRounded } from "react-icons/tb";

const DashboardIndex = () => {
  const { user } = useUserStore();

  const [loading, setLoading] = useState<boolean>(true);

  const [flies, setFlies] = useState<any[]>([]);

  const [projectsCount, setProjectsCount] = useState<{
    free: number;
    all: number;
  } | null>(null);

  useEffect(() => {
    const getFlies = async () => {
      const res = await axios("/fly");
      setFlies(res?.data || []);
      setLoading(false);
    };
    getFlies();

    const getProjectsCount = async () => {
      const { data } = await axios("/count-projects");
      setProjectsCount(data || null);
    };

    getProjectsCount();
  }, []);

  return (
    <div className="w-full bg-uf-dark h-screen text-uf-light">
      <Head>
        <title>{user?.username} | Overview</title>
      </Head>
      <Navbar />
      {flies.length > 0 || loading ? (
        <div className="mt-8 flex justify-between w-full gap-3 items-center px-5 lg:px-10">
          <input
            type="text"
            className="bg-transparent border border-gray-800 rounded-md pl-3 lg:w-[450px] w-full py-2 outline-uf-accent"
            placeholder="Search for a project"
          />
          {projectsCount?.free}
          <Link
            href={"/launch"}
            className=""
            onClick={(e) => {
              if (projectsCount?.free! >= 2) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <button className="flex gap-2 bg-uf-light hover:bg-uf-accent text-uf-dark rounded-md py-2 px-4 w-full items-center justify-center font-semibold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed">
              {projectsCount?.free! >= 2 ? (
                <TbLockSquareRounded size={25} />
              ) : (
                <>
                  <HiOutlineRocketLaunch className="hidden lg:block text-xl group-hover:rotate-[360deg] transition-all duration-500" />
                  <HiPlus className="lg:hidden text-xl group-hover:rotate-[360deg] transition-all duration-500" />
                </>
              )}
              <span className="hidden lg:block">Create a new project</span>
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
                      key={fly.id}
                      name={fly.name}
                      used={fly.used_storage}
                      updated={fly.updated_at}
                      id={fly.id}
                      storage={fly.storage}
                      plan={fly.plan}
                      paused={fly.paused}
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
