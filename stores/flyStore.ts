import { create } from "zustand";

interface FlyStore {
  fly: {
    name: string;
    id: string;
    plan: "free" | "pro";
  };
  setFly: ({
    name,
    id,
    plan,
  }: {
    name: string;
    id: string;
    plan: "free" | "pro";
  }) => void;
}

export const useFlyStore = create<FlyStore>((set) => ({
  fly: {
    name: "",
    id: "",
    plan: "free",
  },
  setFly: ({ name, id, plan }) => {
    set({ fly: { name, id, plan } });
  },
}));
