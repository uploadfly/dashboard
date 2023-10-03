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

  // const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileProps | null>();

  // const selection = (type?: "all") => {
  //   if (type === "all") {
  //     setSelectedFiles([...files]);
  //     return;
  //   }
  //   setSelectedFiles([]);
  // };

  const { fly } = useFlyStore();
  const [loading, setLoading] = useState(true);

  const getFiles = async (fly_id: string) => {
    try {
      const { data } = await axios(`/fly/files?fly_id=${fly_id}`);
      setFiles(data?.files);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fly?.id) {
      getFiles(fly?.id);
      setLoading(false);
    }
  }, [fly?.id]);

  const tableHeads = ["Name", "Date uploaded", "Mime type", "File size"];

  return (
    <DashboardLayout
      pageName="Files"
      isChildLoading={loading}
      childLoadingComponent={<></>}
    >
      {files.length === 0 ? (
        <NoFiles />
      ) : (
        <div className="flex gap-5 overflow-auto">
          <div
            className={`h-full w-full flex relative transition-all ${
              selectedFile ? "mr-96" : "mr-0"
            }`}
          >
            <table className="border-collapse table-auto w-full text-sm">
              <thead className="bg-uf-accent/10">
                <tr>
                  {tableHeads.map((head, index) => (
                    <th
                      className="border-b border-uf-accent/80 font-medium py-2 text-uf-light text-left pl-5 whitespace-nowrap"
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
                    selected={selectedFile == file}
                    uploaded={file.created_at}
                    onClick={() => {
                      // if (selectedFiles.includes(file)) {
                      //   setSelectedFiles(
                      //     selectedFiles.filter((f) => f !== file)
                      //   );
                      //   return;
                      // }
                      // setSelectedFiles([...selectedFiles, file]);
                      if (selectedFile === file) {
                        setSelectedFile(null);
                        return;
                      }
                      setSelectedFile(file);
                    }}
                  />
                ))}
              </tbody>
            </table>
            <div
              className={`h-fit bg-[#1E1E1E] fixed right-5 transition-all rounded-md ${
                selectedFile ? "w-96" : "w-0"
              }`}
            >
              <SelectedFile
                file={selectedFile}
                onClick={() => setSelectedFile(null)}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Files;
