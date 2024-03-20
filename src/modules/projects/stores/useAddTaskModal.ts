import { create } from "zustand";

interface AddTaskModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useAddTaskModal = create<AddTaskModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
