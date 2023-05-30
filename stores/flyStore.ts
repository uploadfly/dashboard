import { create } from "zustand";

interface FlyStore {
  fly: {
    name: string;
    uuid: string;
  };
  setFly: (name: string, uuid: string) => void;
}

export const useFlyStore = create<FlyStore>((set) => ({
  fly: {
    name: "",
    uuid: "",
  },
  setFly: (name, uuid) => {
    set({ fly: { name, uuid } });
  },
}));
