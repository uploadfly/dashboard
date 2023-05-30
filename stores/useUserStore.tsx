import { create } from "zustand";

interface UserStore {
  user: any;
  setUser: () => void;
}

const useUserStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  setUser: () => set((state: { user: any }) => ({ user: state.user })),
}));

export { useUserStore };
