import { create } from "zustand";

interface ShareResourceModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useShareResourceModal = create<ShareResourceModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
