import { FileProps } from "@/interfaces";
import fileSize from "file-size";
import moment from "moment";
import { truncate } from "./File";
import { IoCopyOutline } from "react-icons/io5";
import { copyToClipboard } from "@/pages/[username]/[project]/api-keys";
import { toast } from "react-hot-toast";
import { toastSuccessConfig } from "@/configs/toast";

const Flex = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="">
      <h3 className="font-semibold">{title}</h3>
      <h3>{value}</h3>
    </div>
  );
};

const SelectedFile = ({ file }: { file: FileProps | null | undefined }) => {
  // const file = files?.[0];
  return (
    <div className="w-full h-full p-3 rounded-md">
      {file && (
        <div className="flex gap-5 flex-col">
          {file && <h2 className="text-xl font-semibold">File details</h2>}
          <Flex title="Name" value={truncate(file.name, 45)} />
          <Flex title="Size" value={fileSize(file.size).human("si")} />
          <Flex
            title="Date uploaded"
            value={moment(file.created_at).calendar()}
          />
          <Flex title="Mime type" value={file.type} />
          <div className="">
            <h3 className="font-semibold">URL</h3>
            <div className="flex gap-3">
              <h3>{truncate(file.url, 40)}</h3>
              <button
                onClick={() => {
                  copyToClipboard(file.url);
                  toast("Copied to clipboard", {
                    duration: 500,
                  });
                }}
                className="hover:text-uf-accent transition-colors"
              >
                <IoCopyOutline />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {files.length > 1 && (
        <>
          <p>Multiple files selected</p>
        </>
      )} */}
    </div>
  );
};

export default SelectedFile;
