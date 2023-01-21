import create from "zustand";
import { User } from "@prisma/client";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  reset: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
  reset: () =>
    set((state) => ({
      ...state,
      user: null,
    })),
}));

export default useUserStore;
