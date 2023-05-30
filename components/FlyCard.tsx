import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const FlyCard = ({
  name,
  used,
  updated,
}: {
  name: string;
  used: number;
  updated: string;
}) => {
  const usedStoragePercent = (used / 2048) * 100;
  const { user } = useUserStore();
  const [currentUser, setCurrentUser] = useState<{ username: string }>({
    username: "",
  });
  useEffect(() => {
    setCurrentUser(user);
  }, []);
  return (
    <Link
      href={`/${currentUser.username}/${name}`}
      className="border-[1px] w-[380px] border-gray-500 px-5 py-3 rounded-md hover:border-gray-400 transition-all hover:scale-105"
    >
      <h2 className="text-lg font-bold shiny-text">{name}</h2>
      <div className="my-10">
        <div className="flex justify-between mb-1">
          <p>{used}MB</p>
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
