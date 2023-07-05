import { useFlyStore } from "@/stores/flyStore";
import { useEffect, useState } from "react";

const Name = () => {
  const { fly, setFly } = useFlyStore();

  const [name, setName] = useState("");

  useEffect(() => {
    setName(fly?.name);
  }, [fly]);

  return (
    <div className="">
      <h3>Name</h3>
      <div className="flex gap-2 mt-2">
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
      </div>
    </div>
  );
};

export default Name;
