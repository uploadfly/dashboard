import { useFlyStore } from "@/stores/flyStore";
import { useUserStore } from "@/stores/userStore";
import { IoClose } from "react-icons/io5";
import { BsCloudCheckFill, BsDatabaseFill } from "react-icons/bs";
import { useState } from "react";

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
              <h3 className="font-semibold">
                Delete {user?.username}/{fly?.name}
              </h3>
              <button onClick={onClick} className="text-2xl">
                <IoClose />
              </button>
            </div>
            <div className="mt-5 text-3xl text-uf-accent">
              <BsCloudCheckFill />
            </div>
            <div className="w-full flex items-center gap-5 my-5 justify-center">
              <p className="flex items-center gap-1">
                <BsDatabaseFill className="text-gray-300" />{" "}
                <span>10,000 files</span>
              </p>
              <p className="flex items-center gap-1">
                <BsDatabaseFill className="text-gray-300" /> <span>20GB</span>
              </p>
            </div>
            <button className="w-full bg-uf-accent/50 text-white py-2 rounded-md font-semibold hover:bg-uf-accent transition-colors">
              I want to delete this fly
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
