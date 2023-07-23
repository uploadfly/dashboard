import { axios } from "@/configs/axios";
import {
  KeyProps,
  copyToClipboard,
} from "@/pages/[username]/[project]/api-keys";
import { useFlyStore } from "@/stores/flyStore";
import { on } from "events";
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { IoClose, IoCopy, IoWarningOutline } from "react-icons/io5";
import { RiLoader5Fill } from "react-icons/ri";

const CreateApiKey = ({
  show,
  onClick,
  onKeyCreated,
}: {
  show: boolean;
  onClick: () => void;
  onKeyCreated: (newKey: KeyProps) => void;
}) => {
  const [creating, setCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [name, setName] = useState("");
  const [permission, setPermission] = useState("full");
  const [data, setData] = useState<any>(null);

  const { fly } = useFlyStore();

  const createKey = async () => {
    setCreating(true);
    try {
      const { data } = await axios.post("/api-keys/create?fly_id", {
        fly_id: fly?.uuid,
        name,
        permission,
      });
      setCreating(false);
      setIsCreated(true);
      setData(data);
      onKeyCreated(data);
      console.log(data);
    } catch (error: any) {
      setCreating(false);
      console.log(error.response.data.message);
    }
  };

  const [dataTip, setDataTip] = useState("Copy");

  const clearStates = () => {
    onClick();
    setData(null);
    setIsCreated(false);
    setPermission("full");
    setName("");
  };

  return (
    <>
      {show && (
        <div
          className="w-full h-full flex justify-center items-center bg-uf-dark/20 fixed top-0 right-0 z-50 backdrop-blur-md"
          onClick={clearStates}
        >
          <div
            className="bg-uf-dark rounded-md p-4 w-[500px] border border-uf-accent/20 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold">
                {isCreated ? "View" : "Create"} API key
              </h3>
              <button onClick={clearStates} className="text-2xl">
                <IoClose />
              </button>
            </div>
            {isCreated ? (
              <div className="mt-4 w-full">
                <div className="flex items-center gap-2 border border-yellow-700 p-2 rounded-md w-full">
                  <IoWarningOutline className="text-xl" />
                  You can only see this key once. Store it securely.
                </div>
                <h3 className="mt-4 font-semibold">API key:</h3>
                <div className="w-full border-2 flex items-center justify-between px-3 bg-transparent py-1 rounded-md outline-none border-uf-accent/30 font-semibold mt-1">
                  <input
                    type="text"
                    className="outline-none w-full bg-transparent"
                    value={data?.key}
                    readOnly
                  />
                  <div className="tooltip" data-tip={dataTip}>
                    <IoCopy
                      className="cursor-pointer"
                      onClick={() => {
                        setDataTip("Copied");
                        setTimeout(() => {
                          setDataTip("Copy");
                        }, 500);
                        copyToClipboard(data?.key);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="w-full flex flex-col items-center gap-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  createKey();
                }}
              >
                <div className="w-full">
                  <p>Name</p>
                  <input
                    type="text"
                    className="w-full border-2 pl-3 bg-transparent py-1 rounded-md outline-none border-uf-accent/40 mt-2 focus:border-uf-accent/80 font-semibold"
                    placeholder="Name your key"
                    onChange={(e) =>
                      setName(e.target.value.toLocaleLowerCase())
                    }
                    value={name}
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <p>Permission</p>
                    <div
                      className="tooltip"
                      data-tip={`"Full access" allows to upload, delete and get files. "Upload access" allows only uploads.`}
                    >
                      <BsQuestionCircle className="text-sm" />
                    </div>
                  </div>
                  <select
                    className="w-full border-2 pl-3 bg-transparent py-1 rounded-md outline-none border-uf-accent/40 mt-2 focus:border-uf-accent/80 font-semibold"
                    onChange={(e) => setPermission(e.target.value)}
                  >
                    <option value="full" className="bg-uf-dark" selected>
                      Full access
                    </option>
                    <option value="upload" className="bg-uf-dark">
                      Upload access
                    </option>
                  </select>
                </div>
                <div className="w-full mt-2">
                  <button
                    className="bg-uf-light text-uf-dark px-6 py-2 font-semibold rounded-md disabled:opacity-50"
                    disabled={!name || !permission}
                  >
                    {creating ? (
                      <RiLoader5Fill className="animate-spin text-xl" />
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateApiKey;
