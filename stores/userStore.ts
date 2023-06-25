import { axios } from "@/configs/axios";
import { create } from "zustand";

interface UserStore {
  user: { username: string; email: string } | null;
  setUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: async () => {
    if (!useUserStore.getState().user) {
      try {
        const res = await axios.get("/user");
        const userData = res.data;
        set({ user: userData });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
}));
