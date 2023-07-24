import { KeyProps } from "@/pages/[username]/[project]/api-keys";

const DeleteApiKey = ({
  keyObj,
  onClick,
  onKeyDeleted,
}: {
  keyObj: KeyProps | null;
  onClick: () => void;
  onKeyDeleted: () => void;
}) => {
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
              <form>
                <input
                  type="text"
                  className="w-full rounded-md bg-transparent border-2 text-lg py-1 my-2 border-uf-accent/40"
                />
                <button className="bg-red-600 text-uf-dark rounded-md px-6 font-semibold py-2">
                  Delete
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
