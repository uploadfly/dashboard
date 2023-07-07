import fileSize from "file-size";
import { BsCheckLg } from "react-icons/bs";
import { HiEllipsisVertical } from "react-icons/hi2";

const File = ({
  name,
  size,
  type,
  selected,
  onClick,
}: {
  name: string;
  size: number;
  type: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
        {name}
      </td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
        2 hours ago
      </td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
        PNG
      </td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
        {fileSize(size).human("si")}
      </td>
      <td>
        <button>
          <HiEllipsisVertical />
        </button>
      </td>
    </tr>
  );
};

export default File;
