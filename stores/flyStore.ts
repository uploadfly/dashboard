import { create } from "zustand";

interface FlyStore {
  fly: {
    name: string;
    id: string;
  };
  setFly: (name: string, id: string) => void;
}

export const useFlyStore = create<FlyStore>((set) => ({
  fly: {
    name: "",
    id: "",
  },
  setFly: (name, id) => {
    set({ fly: { name, id } });
  },
}));
