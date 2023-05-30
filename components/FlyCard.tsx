import moment from "moment";
import { ProgressBar } from "@tremor/react";

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
  return (
    <div className="border-[1px] w-[380px] border-gray-500 px-5 py-3 rounded-md">
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
    </div>
  );
};

export default FlyCard;
