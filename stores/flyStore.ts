import { create } from "zustand";

interface FlyStore {
  fly: {
    name: string;
    id: string;
    plan: "free" | "pro";
    paused?: boolean;
  };
  setFly: ({
    name,
    id,
    plan,
    paused,
  }: {
    name: string;
    id: string;
    plan: "free" | "pro";
    paused?: boolean;
  }) => void;
}

export const useFlyStore = create<FlyStore>((set) => ({
  fly: {
    name: "",
    id: "",
    plan: "free",
    paused: false,
  },
  setFly: ({ name, id, plan, paused }) => {
    set({ fly: { name, id, plan, paused } });
  },
}));
