import File from "@/components/File";
import { files } from "@/files";
import { FileProps } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";

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

const Files = () => {
  const [selectedFile, setSelectedFile] = useState<FileProps[]>([]);

  const selection = (type?: "all") => {
    if (type === "all") {
      setSelectedFile([...files]);
      return;
    }
    setSelectedFile([]);
  };

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
          <div className="w-full h-16 sticky bg-[#050505] top-0 z-10 flex items-center px-2 mb-3">
            <div className="flex justify-between w-full items-center">
              <div className="">
                <p>{files.length} files</p>
                <p>{files.reduce((acc, curr) => acc + curr.size, 0)} bytes</p>
              </div>
              <div className="flex items-center gap-4">
                <button></button>
                <button
                  onClick={() => selection("all")}
                  className="border border-gray-50 py-2 px-4 font-semibold rounded-md"
                >
                  Select all
                </button>
                <button className="bg-uf-light text-uf-dark flex items-center py-2 px-4 font-semibold gap-2 rounded-md">
                  <CgSoftwareUpload className="text-xl" />
                  Upload
                </button>
              </div>
            </div>
            <div
              className={`z-10 transition-all duration-300 w-full h-full bg-[#050505] px-3 flex items-center absolute top-0 left-0 ${
                selectedFile.length > 0 ? "-translate-y-0" : "-translate-y-20"
              }`}
            >
              {selectedFile?.length > 1 ? (
                <div className="flex items-center justify-between w-full">
                  <div className="">
                    <p>{selectedFile?.length} files selected</p>
                    <p>
                      {selectedFile?.reduce((acc, curr) => acc + curr.size, 0)}
                      kb
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => selection()}
                      className="border border-gray-50 py-2 px-4 font-semibold rounded-md"
                    >
                      Deselect all
                    </button>
                    <button className="py-2 px-4 bg-red-600 font-semibold rounded-md text-uf-light">
                      Delete all
                    </button>
                  </div>
                </div>
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
                selected={selectedFile.includes(file)}
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
