import { create } from "zustand";

interface PersonalAccessTokenModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const usePersonalAccessTokenModal =
  create<PersonalAccessTokenModalState>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }));
