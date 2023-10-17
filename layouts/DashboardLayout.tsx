import Navbar from "@/components/Navbar";
import NotFound from "@/components/NotFound";
import Sidebar from "@/components/NavLinks";
import { axios } from "@/configs/axios";
import { useFlyStore } from "@/stores/flyStore";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({
  children,
  isChildLoading,
  childLoadingComponent,
  pageName,
  button,
}: {
  children: ReactNode;
  isChildLoading?: boolean;
  childLoadingComponent?: ReactNode;
  pageName: string;
  button?: ReactNode;
}) => {
  const { fly, setFly } = useFlyStore();
  const [status, setStatus] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fly.name || !fly.id) {
      setLoading(true);
      const username = window.location.pathname.split("/")[1];
      const flyName = window.location.pathname.split("/")[2];
      (async () => {
        try {
          const { data, status } = await axios.get(
            `/fly/get?fly_name=${flyName}&username=${username}`
          );
          setFly(data?.name, data?.id);
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
    <div className="bg-uf-dark text-uf-light">
      <Head>
        <title>{pageName} | UploadFly</title>
      </Head>
      {isChildLoading ? (
        <>
          <Navbar />
          <div className="flex w-full">
            <div className="w-full mt-5 px-14">{childLoadingComponent}</div>
          </div>
        </>
      ) : status === 404 ? (
        <NotFound />
      ) : status === 500 ? (
        <>500</>
      ) : (
        <>
          <Navbar />
          <div className="pb-10">
            <div className="lg:w-[90%] mx-auto mt-10 lg:px-10 px-5 min-h-[calc(100vh-150px)]">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold">{pageName}</h1>
                {button}
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
