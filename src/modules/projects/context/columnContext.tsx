"use client";

import { type PropsWithChildren, createContext, useContext } from "react";
import type { Column } from "@/config/types/prisma.type";

interface ColumnContext {
  column: Column;
}

type ColumnProviderProps = PropsWithChildren<ColumnContext>;

const ColumnContext = createContext<ColumnContext | null>(null);

export const ColumnProvider = ({ column, children }: ColumnProviderProps) => {
  return (
    <ColumnContext.Provider value={{ column }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumnContext = () => {
  const context = useContext(ColumnContext);

  if (!context) {
    throw new Error("useColumnContext must be used within a ColumnProvider");
  }

  return context;
};
