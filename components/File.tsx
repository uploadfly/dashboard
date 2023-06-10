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
    <div
      className="flex items-center cursor-pointer gap-2 justify-between mb-3 px-4 py-2 bg-[#050505] w-[235px] rounded-md transition-all duration-300 relative"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="">
          <p className="text-lg mb-1">{name}</p>
          <div className="flex gap-3 items-center">
            <p className="text-xs text-slate-400">Uploaded 2 days ago</p>
            <p className="text-xs text-slate-400">{size}kb</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 w-5 h-5 rounded-md flex items-center justify-center absolute right-2 top-2">
        {selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default File;
