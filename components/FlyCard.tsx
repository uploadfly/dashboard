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
      className="flex flex-col justify-between rounded p-3 text-primary shadow-md border border-gray-600 transition duration-150 hover:border-uf-accent w-full"
      onClick={() => setFly(name, uuid)}
    >
      <h2 className="text-lg font-bold shiny-text">{name}</h2>
      <div className="my-14">
        <div className="flex justify-between mb-1">
          <p className="text-uf-light">{filesize(used).human("si")}</p>
          <p className="text-uf-light">{filesize(storage).human("si")}</p>
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
