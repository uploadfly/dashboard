import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/configs/axios";
import moment from "moment";

interface LogProps {
  endpoint: string;
  created_at: Date;
  method: string;
  status: number;
  uuid: string;
  ip_address: string;
  request_body: JSON;
  response_body: JSON;
}

const Log = () => {
  const { fly } = useFlyStore();
  const router = useRouter();
  const [log, setLog] = useState<LogProps | null>(null);

  useEffect(() => {
    if (router.query.log_id && fly?.uuid) {
      (async () => {
        const log_id = router.query.log_id;

        const { data } = await axios(
          `/log?log_id=${log_id}&fly_id=${fly.uuid}`
        );
        setLog(data);
      })();
    }
  }, [router.query.log_id, fly?.uuid]);

  return (
    <DashboardLayout pageName="Log Details">
      <div className="flex items-center gap-24">
        <div className="">
          <p className="text-sm font-semibold mb-2">ENDPOINT</p>
          <span className="font-semibold my-14">{log?.endpoint}</span>
        </div>
        <div className="">
          <p className="text-sm font-semibold">DATE</p>
          <span className="font-semibold my-14">
            {moment(log?.created_at).fromNow()}
          </span>
        </div>
        <div className="">
          <p className="text-sm font-semibold mb-2">STATUS</p>
          <span
            className={`${
              log?.status === 200 || log?.status === 201
                ? "text-green-500 bg-green-500/20"
                : "text-red-500 bg-red-500/20"
            } font-semibold px-3 rounded-md py-1`}
          >
            {log?.status}
          </span>
        </div>
        <div className="">
          <p className="text-sm font-semibold mb-2">METHOD</p>
          <span className="font-semibold my-14 uppercase">{log?.method}</span>
        </div>
        <div className="">
          <p className="text-sm font-semibold mb-2">IP ADDRESS</p>
          <span className="font-semibold my-14">{log?.ip_address}</span>
        </div>
      </div>
      <div className="my-10">
        <h2 className="font-semibold text-xl">Request body</h2>
        <p>{JSON.stringify(log?.request_body)}</p>
      </div>
      <div className="my-10">
        <h2 className="font-semibold text-xl">Response body</h2>
        <p>{JSON.stringify(log?.response_body)}</p>
      </div>
    </DashboardLayout>
  );
};

export default Log;
