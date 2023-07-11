import fileSize from "file-size";
import moment from "moment";
import { BiRightArrow } from "react-icons/bi";

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
}: {
  name: string;
  size: number;
  type: string;
  selected: boolean;
  onClick: () => void;
  uploaded: Date;
}) => {
  return (
    <tr
      className={`${
        selected && "bg-slate-800/60 hover:bg-slate-800/70"
      } hover:bg-slate-800/30`}
      onClick={onClick}
    >
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
    </tr>
  );
};

export default File;
