import File from "@/components/File";
import NoFiles from "@/components/NoFiles";
import SelectedFile from "@/components/SelectedFile";
import { axios } from "@/configs/axios";
import { FileProps } from "@/interfaces";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";

const Files = () => {
  const [files, setFiles] = useState<FileProps[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([]);

  const selection = (type?: "all") => {
    if (type === "all") {
      setSelectedFiles([...files]);
      return;
    }
    setSelectedFiles([]);
  };

  const { fly } = useFlyStore();

  const getFiles = async (fly_id: string) => {
    try {
      const { data } = await axios(`/fly/files?fly_id=${fly_id}`);
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

  const tableHeads = ["Name", "Date uploaded", "Mime type", "File size"];

  return (
    <DashboardLayout pageName="Files">
      {files.length === 0 ? (
        <NoFiles />
      ) : (
        <div className="flex gap-5">
          <div
            className={`h-full w-full flex relative transition-all ${
              selectedFiles.length > 0 ? "mr-96" : "mr-0"
            }`}
          >
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
                    selected={selectedFiles.includes(file)}
                    uploaded={file.created_at}
                    onClick={() => {
                      if (selectedFiles.includes(file)) {
                        setSelectedFiles(
                          selectedFiles.filter((f) => f !== file)
                        );
                        return;
                      }
                      setSelectedFiles([...selectedFiles, file]);
                    }}
                  />
                ))}
              </tbody>
            </table>
            <div
              className={`h-fit bg-gray-900/50 fixed right-5 transition-all rounded-md ${
                selectedFiles.length > 0 ? "w-96" : "w-0"
              }`}
            >
              <SelectedFile files={selectedFiles} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Files;
