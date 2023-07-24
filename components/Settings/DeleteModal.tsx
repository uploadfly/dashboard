import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { BsCloudCheckFill, BsDatabaseFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axios } from "@/configs/axios";
import { RiLoader5Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { IoFileTrayFull } from "react-icons/io5";
import fileSize from "file-size";
import { toast } from "react-hot-toast";
import { toastErrorConfig } from "@/configs/toast";

const formatNumber = (number: number): string => {
  if (number >= 0 && number <= 999) {
    return number.toString();
  }

  if (number >= 1000 && number <= 999999) {
    return number.toLocaleString();
  }

  if (number >= 1000000) {
    let abbreviatedNumber: string;
    if (number < 10000000) {
      abbreviatedNumber = (number / 1000000).toFixed(2) + "M";
    } else {
      abbreviatedNumber = (number / 1000000).toFixed(1) + "M";
    }
    return abbreviatedNumber;
  }

  throw new Error("Invalid number");
};

const DeleteModal = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) => {
  const { user } = useUserStore();
  const { fly } = useFlyStore();
  const [wantToDelete, setWantToDelete] = useState(false);
  const [wantToDeleteFinal, setWantToDeleteFinal] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState("");
  const [deleting, setDeleting] = useState(false);

  const phrase = `${user?.username}/${fly?.name}`;

  const router = useRouter();

  const deleteFly = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/fly/delete?fly_id=${fly?.uuid}`);
      setDeleting(false);
      router.push(`/${user?.username}`);
    } catch (error: any) {
      console.log(error);
      setDeleting(false);
      toast(error.response.data.message, toastErrorConfig);
    }
  };

  const [total, setTotal] = useState({ files: 0, size: 0 });

  useEffect(() => {
    if (fly?.uuid) {
      (async () => {
        try {
          const { data } = await axios(`/fly/total?fly_id=${fly?.uuid}`);
          setTotal(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [fly?.uuid]);

  return (
    <>
      {show && (
        <div
          className="w-full h-full flex justify-center items-center bg-uf-dark/20 fixed top-0 right-0 z-50 backdrop-blur-md"
          onClick={onClick}
        >
          <div
            className="bg-uf-dark rounded-md p-4 w-[500px] border border-uf-accent/20 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold">Delete {phrase}</h3>
              <button onClick={onClick} className="text-2xl">
                <IoClose />
              </button>
            </div>
            <div className="mt-5 text-3xl text-uf-accent">
              <BsCloudCheckFill />
            </div>
            <div className="w-full flex items-center gap-5 my-5 justify-center">
              <p className="flex items-center gap-1">
                <IoFileTrayFull className="text-gray-300" />{" "}
                <span>{formatNumber(total?.files)} files</span>
              </p>
              <p className="flex items-center gap-1">
                <BsDatabaseFill className="text-gray-300" />{" "}
                <span>{fileSize(total?.size).human("si")}</span>
              </p>
            </div>

            <>
              {wantToDelete && !wantToDeleteFinal && (
                <div className="mt-2 w-full">
                  <p className="text-yellow-300 flex items-center gap-2 bg-yellow-500/10 w-full px-1 py-2 rounded-md justify-center">
                    <IoWarningOutline /> Read this before proceeding
                  </p>
                  <p className=" px-1 font-semibold text-sm mt-3 text-red-500">
                    This will permanently delete this fly, all of its files and
                    API keys. This action cannot be undone, everything will be
                    deleted FOREVER!
                  </p>
                </div>
              )}

              {wantToDeleteFinal && (
                <>
                  <p className="text-gray-300 mb-3">
                    Type <span className="font-semibold">{`"${phrase}"`}</span>{" "}
                    to confirm
                  </p>
                  <input
                    type="text"
                    className="w-full border-2 outline-none pl-3 border-red-600/30 rounded-md py-2 bg-transparent"
                    onChange={(e) => setDeletePhrase(e.target.value)}
                  />
                </>
              )}
              <button
                className={`w-full mt-3  text-white py-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed ${
                  wantToDeleteFinal
                    ? "bg-red-600 disabled:bg-red-600/40"
                    : "bg-uf-accent/50 hover:bg-uf-accent"
                }`}
                onClick={() => {
                  if (wantToDeleteFinal) {
                    deleteFly();
                    return;
                  }

                  if (wantToDelete) {
                    setWantToDeleteFinal(true);
                    return;
                  }

                  setWantToDelete(true);
                }}
                disabled={
                  (wantToDeleteFinal && deletePhrase !== phrase) || deleting
                }
              >
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    Deleting...{" "}
                    <RiLoader5Fill className="animate-spin text-xl" />
                  </span>
                ) : wantToDelete && !wantToDeleteFinal ? (
                  "I have read the warning and want to proceed"
                ) : wantToDeleteFinal ? (
                  "Delete this fly"
                ) : (
                  "I want to delete this fly"
                )}
              </button>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
