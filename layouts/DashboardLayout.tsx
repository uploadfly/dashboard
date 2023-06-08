import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { axios } from "@/configs/axios";
import { useFlyStore } from "@/stores/flyStore";
import { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { fly, setFly } = useFlyStore();
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    if (!fly.name || !fly.uuid) {
      const flyName = window.location.pathname.split("/")[2];
      (async () => {
        try {
          const { data, status } = await axios.get(
            `/fly/get?fly_name=${flyName}`
          );
          setFly(data?.name, data?.uuid);
          setStatus(status);
        } catch (error: any) {
          console.log(error);
          setStatus(error?.response?.status);
        }
      })();
    }
  }, []);

  return (
    <div className="bg-uf-dark text-uf-light h-screen overflow-y-hidden">
      <Navbar />
      <div className="h-screen flex w-full">
        <div className="w-[20%] p-5 bg-[#050505] sticky top-1">
          <Sidebar />
        </div>
        <div className="w-[80%] mt-5 px-10 overflow-y-scroll mb-20">
          {/* {status === 404 ? (
            <h1>Not found</h1>
          ) : status === 500 ? (
            <>
              <h1>Internal server error</h1>
            </>
          ) : ( */}
          <>{children}</>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
