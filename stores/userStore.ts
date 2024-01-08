import { create } from "zustand";

interface UserStore {
  user: { username: string; email?: string; name?: string; id: string } | null;
  setUser: (userData: {
    id: string;
    username: string;
    email?: string;
    name?: string;
  }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
  },
}));
