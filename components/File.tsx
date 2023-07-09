import fileSize from "file-size";
import { BsCheckLg } from "react-icons/bs";
import { HiEllipsisVertical } from "react-icons/hi2";
import dayjs from "dayjs";
import moment from "moment";

const File = ({
  name,
  size,
  type,
  selected,
  uploaded,
  onClick,
}: {
  name: string;
  size: number;
  type: string;
  selected: boolean;
  onClick: () => void;
  uploaded: Date;
}) => {
  const truncate = (str: string) => {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    }
    str;
  };

  return (
    <tr className="hover:bg-slate-800/30">
      <td
        className="border-b border-slate-700 p-4  text-slate-400"
        title={name}
      >
        {truncate(name)}
      </td>
      <td
        className="border-b border-slate-700 p-4 text-slate-400"
        title={moment(uploaded).calendar()}
      >
        {moment(uploaded).fromNow()}
      </td>
      <td className="border-b border-slate-700 p-4 text-slate-400">{type}</td>
      <td className="border-b border-slate-700 p-4 text-slate-400">
        {fileSize(size).human("si")}
      </td>
      <td className="border-b border-slate-700 p-4 text-slate-400 text-xl">
        <HiEllipsisVertical />
      </td>
    </tr>
  );
};

export default File;
