import File from "@/components/File";
import { axios } from "@/configs/axios";
import { FileProps } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";

const Files = () => {
  const [files, setFiles] = useState<FileProps[]>([]);

  const [selectedFile, setSelectedFile] = useState<FileProps[]>([]);

  const selection = (type?: "all") => {
    if (type === "all") {
      setSelectedFile([...files]);
      return;
    }
    setSelectedFile([]);
  };

  const { fly } = useFlyStore();

  const getFiles = async (fly_id: string) => {
    try {
      const { data } = await axios(`/fly/files?fly_id=${fly_id}`);
      console.log(data);
      setFiles(data?.files);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fly?.uuid) {
      getFiles(fly?.uuid);
    }
  }, [fly?.uuid]);

  const tableHeads = ["Name", "Date uploaded", "Mime type", "File size", ""];

  return (
    <DashboardLayout pageName="Files">
      <div className="flex gap-5">
        <div className="h-full w-full flex relative mr-96">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                {tableHeads.map((head, index) => (
                  <th
                    className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    key={index}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {files.map((file) => (
                <File
                  key={file.id}
                  name={file.name}
                  size={file.size}
                  type={file.type}
                  selected={selectedFile.includes(file)}
                  uploaded={file.created_at}
                  onClick={() => {
                    if (selectedFile.includes(file)) {
                      setSelectedFile(selectedFile.filter((f) => f !== file));
                      return;
                    }
                    setSelectedFile([...selectedFile, file]);
                  }}
                />
              ))}
            </tbody>
          </table>
          <div className="w-96 h-16 bg-slate-800 fixed right-5"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Files;
