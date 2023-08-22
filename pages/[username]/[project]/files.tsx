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
    if (fly?.uuid) {
      getFiles(fly?.uuid);
      setLoading(false);
    }
  }, [fly?.uuid]);

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
        <div className="flex gap-5">
          <div
            className={`h-full w-full flex relative transition-all ${
              selectedFile ? "mr-96" : "mr-0"
            }`}
          >
            <div className="flex gap-7 justify-start items-center w-fit flex-wrap">
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
            </div>

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
