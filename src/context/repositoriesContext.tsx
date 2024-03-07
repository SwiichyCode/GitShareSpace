"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { Repository, User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

interface RepositoriesContext {
  user: User | null;
  likes: Like[];
  repositoriesAlreadyStarred?: string[];
}

type RepositoriesProviderProps = PropsWithChildren<RepositoriesContext>;

const RepositoriesContext = createContext<RepositoriesContext | null>(null);

export const RepositoriesProvider = ({
  user,
  likes,
  repositoriesAlreadyStarred,
  children,
}: RepositoriesProviderProps) => {
  return (
    <RepositoriesContext.Provider
      value={{ user, likes, repositoriesAlreadyStarred }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositoriesContext = () => {
  const context = useContext(RepositoriesContext);

  if (!context) {
    throw new Error(
      "useRepositoriesContext must be used within a RepositoriesProvider",
    );
  }

  return context;
};
