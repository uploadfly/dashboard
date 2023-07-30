import NoLogs from "@/components/NoLogs";
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
  const [logs, setLogs] = useState<LogProps[]>([]);
  const { fly } = useFlyStore();
  const { user } = useUserStore();
  const tableHeads = ["Endpoint", "Status", "Method", "Created", ""];

  useEffect(() => {
    if (fly?.uuid) {
      (async () => {
        try {
          const { data } = await axios(`/logs?fly_id=${fly.uuid}`);
          setLogs(data);
        } catch (error) {}
      })();
    }
  }, [fly?.uuid]);

  const link = `/${user?.username}/${fly?.name}`;

  return (
    <DashboardLayout pageName="Logs">
      {logs.length === 0 ? (
        <NoLogs />
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
                  <td className="border-b border-slate-700 p-4 text-slate-400 font-bold whitespace-nowrap">
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
                  <td className="border-b border-slate-700 p-4 text-slate-400 whitespace-nowrap">
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
