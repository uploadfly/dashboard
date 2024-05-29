import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import Link from "next/link";
import filesize from "file-size";
import { FaCircle, FaSquare } from "react-icons/fa";
import { BsTriangleFill } from "react-icons/bs";

const FlyCard = ({
  name,
  used,
  updated,
  id,
  storage,
  plan,
  paused,
}: {
  name: string;
  used: number;
  updated: string;
  id: string;
  storage: number;
  plan: "free" | "basic" | "pro";
  paused?: boolean;
}) => {
  const { user } = useUserStore();

  const { setFly } = useFlyStore();

  const usedStorage = filesize(used).to("MB");
  const usedStoragePercent =
    Number(usedStorage) / Number(filesize(storage).to("MB"));

  const icon = {
    free: FaCircle,
    basic: BsTriangleFill,
    pro: FaSquare,
  };

  return (
    <Link
      href={`${user?.username}/${name}`}
      className="flex flex-col justify-between rounded p-3 text-primary shadow-md border border-gray-600 transition duration-150 hover:border-uf-accent w-full"
      onClick={() =>
        setFly({
          id,
          name,
          plan,
          paused,
        })
      }
    >
      <div className="flex justify-between items-center">
        <h2 className="text-white">{name}</h2>
        {icon[plan]({
          className: "text-uf-accent",
          size: 20,
        })}
      </div>
      <div className="my-14">
        <div className="flex justify-between mb-1">
          <p className="text-uf-light">{filesize(used).human("si")}</p>
          {plan !== "free" && (
            <p className="text-uf-light">{filesize(storage).human("si")}</p>
          )}
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div
            className="bg-uf-accent h-full rounded-full"
            style={{ width: `${usedStoragePercent}%` }}
          ></div>
        </div>
      </div>
      <p className="text-uf-light">{moment(updated).fromNow()}</p>
    </Link>
  );
};

export default FlyCard;
