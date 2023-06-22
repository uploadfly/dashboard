import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import Link from "next/link";
import filesize from "file-size";

const FlyCard = ({
  name,
  used,
  updated,
  uuid,
  storage,
}: {
  name: string;
  used: number;
  updated: string;
  uuid: string;
  storage: number;
}) => {
  const { user } = useUserStore();
  const { setFly } = useFlyStore();

  const usedStorage = filesize(used).to("MB");
  const usedStoragePercent =
    Number(usedStorage) / Number(filesize(storage).to("MB"));

  return (
    <Link
      href={`${user?.username}/${name}`}
      className="border-[1px] w-[380px] border-gray-500 px-5 py-3 rounded-md hover:border-gray-400 transition-all hover:scale-105"
      onClick={() => setFly(name, uuid)}
    >
      <h2 className="text-lg font-bold shiny-text">{name}</h2>
      <div className="my-10">
        <div className="flex justify-between mb-1">
          <p>{usedStorage}MB</p>
          <p>2GB</p>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div
            className="uf-gradient h-full rounded-full"
            style={{ width: `${usedStoragePercent}%` }}
          ></div>
        </div>
      </div>
      <p>{moment(updated).fromNow()}</p>
    </Link>
  );
};

export default FlyCard;
