import { create } from "zustand";

interface UserStore {
  user: { username: string; email?: string } | null;
  setUser: (userData: { username: string; email?: string }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
  },
}));
