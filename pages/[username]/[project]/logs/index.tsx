import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

interface LogProps {
  uuid: string;
  endpoint: string;
  status: number;
  method: string;
  created_at: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<LogProps[]>([
    {
      uuid: "1108e7cc-d4bc-4ecd-a34d-8234eda87d6a",
      created_at: "2023-07-28T10:05:59.571Z",
      endpoint: "/upload",
      method: "post",
      status: 201,
    },
    {
      uuid: "6c7c48c4-a9be-41a9-bf28-c91edbd7a5ff",
      created_at: "2023-07-28T10:05:59.057Z",
      endpoint: "/upload",
      method: "post",
      status: 201,
    },
    {
      uuid: "1857cfc1-a74f-4273-a2a9-4d87337cd7a5",
      created_at: "2023-07-28T09:53:59.403Z",
      endpoint: "/upload",
      method: "post",
      status: 201,
    },
    {
      uuid: "7dc26ad0-bf73-4373-a9d9-8d19f3430954",
      created_at: "2023-07-28T09:53:58.917Z",
      endpoint: "/upload",
      method: "post",
      status: 201,
    },
    {
      uuid: "e081883e-0b77-43bb-addd-9dc21575f1fa",
      created_at: "2023-07-28T09:53:18.408Z",
      endpoint: "/upload",
      method: "delete",
      status: 400,
    },
    {
      uuid: "46278077-2622-4499-9572-7da5ba5524e2",
      created_at: "2023-07-28T09:53:18.254Z",
      endpoint: "/upload",
      method: "delete",
      status: 400,
    },
  ]);
  const { fly } = useFlyStore();
  const { user } = useUserStore();
  const tableHeads = ["Endpoint", "Status", "Method", "Created", ""];

  // useEffect(() => {
  //   if (fly?.uuid) {
  //     (async () => {
  //       try {
  //         const { data } = await axios(`/logs?fly_id=${fly.uuid}`);
  //         setLogs(data);
  //       } catch (error) {}
  //     })();
  //   }
  // }, [fly?.uuid]);

  const link = `/${user?.username}/${fly?.name}`;

  return (
    <DashboardLayout pageName="Logs">
      {logs.length === 0 ? (
        <></>
      ) : (
        <div className="flex gap-5">
          <table className="border-collapse table-auto w-full text-sm">
            <thead className="bg-uf-accent/10">
              <tr>
                {tableHeads.map((head, index) => (
                  <th
                    className="border-b border-uf-accent/80 font-medium py-2 text-uf-light text-left pl-5"
                    key={index}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.uuid}>
                  <td className="border-b border-slate-700 p-4 text-slate-400 font-bold">
                    {log.endpoint}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    <span
                      className={`${
                        log.status === 200 || log.status === 201
                          ? "text-green-500 bg-green-500/20"
                          : "text-red-500 bg-red-500/20"
                      } font-semibold px-3 py-1 rounded-md`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400 uppercase">
                    {log.method}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    {moment(log.created_at).fromNow()}
                  </td>
                  <td className="border-b border-slate-700 p-4 text-slate-400">
                    <Link href={`${link}/logs/${log.uuid}`}>
                      <FaAngleRight />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Logs;
