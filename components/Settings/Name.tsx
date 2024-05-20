import { axios } from "@/configs/axios";
import { useFlyStore } from "@/stores/flyStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";

const Name = () => {
  const { fly, setFly } = useFlyStore();

  const [name, setName] = useState("");
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setName(fly?.name);
  }, [fly]);

  const rename = async () => {
    try {
      const flyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{3,100}(?<!-)$/i;

      if (name && name.length < 3) {
        toast("Fly name must be at least 3 characters long", toastErrorConfig);
        return;
      }

      if (name && name.length > 100) {
        toast("Fly name must be less than 101 characters", toastErrorConfig);
        return;
      }

      if ((name && name.startsWith("-")) || name.endsWith("-")) {
        toast("Fly name cannot start or end with a dash", toastErrorConfig);
        return;
      }

      if (name && name.includes("--")) {
        toast("Fly name cannot contain consecutive dashes", toastErrorConfig);
        return;
      }

      if (name && !flyNameRegex.test(name)) {
        toast("Fly names cannot contain special characters", toastErrorConfig);
        return;
      }
      setIsRenaming(true);
      await axios.put("/fly/rename", {
        fly_id: fly?.id,
        name: name,
      });
      setFly({
        ...fly,
        name: name,
      });
      const paths = router.asPath.split("/");
      setIsRenaming(false);
      const newPath = `/${paths[1]}/${name}/${paths[3]}`;
      router.replace(newPath);
      toast.success("Project renamed successfully", toastSuccessConfig);
    } catch (error: any) {
      console.log(error.response.data);
      setIsRenaming(false);
    }
  };

  return (
    <div className="">
      <h3>Project name</h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rename();
          }}
          className="flex gap-2 mt-2 items-center"
        >
          <input
            type="text"
            className="w-[380px] py-2 border-none outline-none rounded-md bg-[#1e1e1e] pl-4 font-semibold"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <button
            className="bg-uf-accent/30 px-4 py-2 rounded-md font-semibold disabled:cursor-not-allowed"
            disabled={!name || fly?.name === name}
          >
            {isRenaming ? (
              <RiLoader5Fill className="animate-spin text-2xl" />
            ) : (
              "Rename"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Name;
