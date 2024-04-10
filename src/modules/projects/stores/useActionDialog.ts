import { create } from "zustand";

type DialogKey = "column";

interface ActionDialogState {
  dialogs: Record<DialogKey, boolean>;
  setOpen: (key: DialogKey, open: boolean) => void;
}

export const useActionDialog = create<ActionDialogState>((set) => ({
  dialogs: {
    column: false,
  },

  setOpen: (key, open) =>
    set((state) => ({ dialogs: { ...state.dialogs, [key]: open } })),
}));
