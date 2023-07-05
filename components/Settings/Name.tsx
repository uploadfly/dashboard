import { axios } from "@/configs/axios";
import { useFlyStore } from "@/stores/flyStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Name = () => {
  const { fly, setFly } = useFlyStore();

  const [name, setName] = useState("");
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setName(fly?.name);
  }, [fly]);

  const rename = async () => {
    setIsRenaming(true);
    try {
      await axios.put("/fly/rename", {
        fly_id: fly?.uuid,
        name: name,
      });

      setFly(name, fly?.uuid);
      const paths = router.asPath.split("/");

      const newPath = `/${paths[1]}/${name}/${paths[3]}`;
      router.replace(newPath);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="">
      <h3>Name</h3>
      <div className="flex gap-2 mt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rename();
          }}
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
            Rename
          </button>
        </form>
      </div>
    </div>
  );
};

export default Name;
