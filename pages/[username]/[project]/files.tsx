import { files } from "@/files";
import { File } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useState } from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="flex items-center gap-2 mb-3 px-4 py-2 bg-[#050505] w-full rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
      </svg>
      {text}
    </button>
  );
};

const File = ({
  name,
  size,
  type,
  onClick,
}: {
  name: string;
  size: number;
  type: string;
  onClick: () => void;
}) => {
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  return (
    <div
      className="flex items-center cursor-pointer gap-2 justify-between mb-3 px-4 py-2 bg-[#050505] w-[235px] rounded-md transition-all duration-300 relative"
      onClick={() => {
        setShowCheckIcon(!showCheckIcon);
        onClick();
      }}
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
        {showCheckIcon && (
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

const Files = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  return (
    <DashboardLayout>
      <div className="flex gap-5">
        <div className="h-full w-[35%] flex flex-col items-end sticky top-0">
          <Button text="Root" />
          <div className="w-[90%] h-fit">
            <Button text="Root" />
            <Button text="Root" />
            <Button text="Root" />
            <Button text="Root" />
            <Button text="Root" />
            <Button text="Root" />
            <Button text="Root" />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="w-full h-16 sticky border-b border-slate-700 bg-[#050505] top-0 z-10 flex items-center px-2 mb-3">
            <div className="">
              <p>{files.length} files</p>
              <p>{files.reduce((acc, curr) => acc + curr.size, 0)} bytes</p>
            </div>
            <div
              className={`-translate-y-20 z-20 transition-all duration-300 w-full h-full bg-[#050505] px-3 flex items-center absolute top-0 left-0 ${
                selectedFile.length > 0 &&
                "-translate-y-0 transition-all duration-300"
              }`}
            >
              {selectedFile?.length > 1 ? (
                <>
                  <p>{selectedFile?.length} files selected</p>
                  <p>
                    {selectedFile?.reduce((acc, curr) => acc + curr.size, 0)}kb
                  </p>
                </>
              ) : (
                <>
                  <p>{selectedFile?.[0]?.name}</p>
                  <p>{selectedFile?.[0]?.size}</p>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {files.map((file) => (
              <File
                key={file.id}
                name={file.name}
                size={file.size}
                type={file.mimetype}
                onClick={() => {
                  if (selectedFile.includes(file)) {
                    setSelectedFile(selectedFile.filter((f) => f !== file));
                    return;
                  }
                  setSelectedFile([...selectedFile, file]);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Files;
