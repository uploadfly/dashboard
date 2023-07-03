import File from "@/components/File";
import { files } from "@/files";
import { FileProps } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { HiFolderOpen } from "react-icons/hi2";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="flex items-center gap-2 mb-3 px-4 py-2 bg-[#050505] w-full rounded-md">
      <HiFolderOpen />
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
    <DashboardLayout pageName="Files">
      <div className="flex gap-5">
        <div className="h-full w-full">
          <div className="w-full h-16 sticky bg-[#050505] z-10 flex items-center px-2 mb-3">
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
            {/* <div
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
            </div> */}
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
