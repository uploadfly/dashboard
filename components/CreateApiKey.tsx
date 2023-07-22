import { IoClose } from "react-icons/io5";

const CreateApiKey = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) => {
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
              <h3 className="font-semibold">Create an API key</h3>
              <button onClick={onClick} className="text-2xl">
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateApiKey;
