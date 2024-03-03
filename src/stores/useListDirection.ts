import { create } from "zustand";

export type DirectionType = "column" | "grid";

interface ListDirectionState {
  direction: DirectionType;
  setDirection: (direction: DirectionType) => void;
}

export const useListDirection = create<ListDirectionState>((set) => ({
  direction: "grid",
  setDirection: (direction) => set({ direction }),
}));
