import { create } from "zustand";

interface UserStore {
  user: any;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  setUser: (user: any) => set({ user }),
}));
