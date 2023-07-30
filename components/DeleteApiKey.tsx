import { axios } from "@/configs/axios";
import { toastSuccessConfig } from "@/configs/toast";
import { KeyProps } from "@/interfaces";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiLoader5Fill } from "react-icons/ri";

const DeleteApiKey = ({
  keyObj,
  onClick,
  onKeyDeleted,
}: {
  keyObj: KeyProps | null;
  onClick: () => void;
  onKeyDeleted: () => void;
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteKey = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api-keys/delete?key_id=${keyObj?.uuid}`);
      setDeleting(false);
      onKeyDeleted();
      toast("API Key deleted successfully", toastSuccessConfig);
    } catch (error) {
      setDeleting(false);
      console.log(error);
    }
  };

  const [phrase, setPhrase] = useState<string>("");

  return (
    <>
      {keyObj && (
        <div
          className="w-full h-full flex justify-center items-center bg-uf-dark/20 fixed top-0 right-0 z-50 backdrop-blur-md"
          onClick={onClick}
        >
          <div
            className="bg-uf-dark rounded-md p-4 w-[500px] border border-uf-accent/20 flex flex-col text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold text-left">
              Are you sure you want to delete the API key{" "}
              <b className="font-bold">{keyObj.name}</b>?
            </p>
            <p className="my-3 text-left font-bold text-red-600">
              Apps using this key will no longer be able to access the API. This
              cannot be undone.
            </p>

            <div className="">
              <p>
                Type <b>DELETE</b> to confirm
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  deleteKey();
                  setPhrase("");
                }}
              >
                <input
                  type="text"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  className="w-full rounded-md bg-transparent border-2 font-semibold pl-2 py-1 my-2 border-uf-accent/40"
                />
                <button
                  className="bg-red-600 text-uf-dark rounded-md px-6 font-semibold py-2 disabled:opacity-50"
                  disabled={deleting || phrase !== "DELETE"}
                >
                  {deleting ? (
                    <RiLoader5Fill className="animate-spin text-xl" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteApiKey;
