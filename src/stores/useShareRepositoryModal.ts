import { create } from "zustand";

interface ShareRepositoryModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useShareRepositoryModal = create<ShareRepositoryModalState>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }),
);
