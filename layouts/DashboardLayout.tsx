import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { axios } from "@/configs/axios";
import { useFlyStore } from "@/stores/flyStore";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({
  children,
  isChildLoading,
  childLoadingComponent,
  pageName,
}: {
  children: ReactNode;
  isChildLoading?: boolean;
  childLoadingComponent?: ReactNode;
  pageName: string;
}) => {
  const { fly, setFly } = useFlyStore();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fly.name || !fly.uuid) {
      setLoading(true);
      const username = window.location.pathname.split("/")[1];
      const flyName = window.location.pathname.split("/")[2];
      (async () => {
        try {
          const { data, status } = await axios.get(
            `/fly/get?fly_name=${flyName}&username=${username}`
          );
          setFly(data?.name, data?.uuid);
          setStatus(status);
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          setStatus(error?.response?.status);
        }
      })();
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageName} | Uploadfly</title>
      </Head>
      {isChildLoading ? (
        <div className="bg-uf-dark text-uf-light h-screen overflow-y-hidden">
          <Navbar />
          <div className="h-screen flex w-full">
            <div className="w-[20%] p-5 bg-[#050505] sticky top-1">
              <Sidebar loading={loading} />
            </div>
            <div className="w-[80%] mt-5 px-10 overflow-y-scroll mb-20">
              {childLoadingComponent}
            </div>
          </div>
        </div>
      ) : status === 404 ? (
        <div className="bg-uf-dark text-uf-light flex items-center justify-center h-screen overflow-y-hidden">
          <h1 className="text-center text-9xl font-bold">404</h1>
        </div>
      ) : status === 500 ? (
        <>500</>
      ) : (
        <div className="bg-uf-dark text-uf-light h-screen overflow-y-hidden">
          <Navbar />
          <div className="h-screen flex w-full">
            <div className="w-[20%] p-5 bg-[#050505] sticky top-1">
              <Sidebar loading={loading} />
            </div>
            <div className="w-[80%] mt-5 px-10 overflow-y-scroll mb-20">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
