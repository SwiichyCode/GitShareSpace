import { create } from "zustand";

export type ToggleType = "starred" | "liked" | "all";

interface ToggleFilterState {
  toggleFilter: ToggleType;
  setToggleFilter: (toggleFilter: ToggleType) => void;
}

export const useToggleFilter = create<ToggleFilterState>((set) => ({
  toggleFilter: "all",
  setToggleFilter: (toggleFilter) => set({ toggleFilter }),
}));
