import fileSize from "file-size";
import moment from "moment";
import { BiRightArrow } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { HiEllipsisVertical, HiOutlineDocumentText } from "react-icons/hi2";
import { MdAudiotrack, MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineApi } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

export const truncate = (str: string, length: number = 20) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
};

const File = ({
  name,
  size,
  type,
  selected,
  uploaded,
  onClick,
  uploaded_via,
}: {
  name: string;
  size: number;
  type: string;
  selected: boolean;
  onClick: () => void;
  uploaded: Date;
  uploaded_via: string;
}) => {
  return (
    <div className="w-[260px] py-1 px-2 h-[280px] rounded-md bg-black/20 border-2 border-white/10 hover:border-uf-accent/50 transition-colors cursor-pointer flex flex-col justify-between items-center">
      <div className="flex justify-between w-full">
        <small>{truncate(name)}</small>
        <small>{fileSize(size).human("si")}</small>
      </div>
      <div className="text-6xl">
        {type.includes("image") ? (
          <BsImage />
        ) : type.includes("video") ? (
          <MdOutlineVideoLibrary />
        ) : type.includes("audio") ? (
          <MdAudiotrack />
        ) : (
          <HiOutlineDocumentText />
        )}
      </div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-1">
          <Tooltip place="top" id="uploaded" />
          <span
            className="hover:text-uf-accent transition-colors"
            data-tooltip-id="uploaded"
            data-tooltip-content={`Uploaded via ${uploaded_via}`}
          >
            {uploaded_via === "REST API" && <AiOutlineApi />}
          </span>

          <small>{truncate(type)}</small>
        </div>
        <button>
          <HiEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default File;
