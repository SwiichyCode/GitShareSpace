"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { User } from "@/config/types/prisma.type";
import type { Language, Like } from "@prisma/client";

interface RepositoriesContext {
  user: User | null;
  likes: Like[];
  languages: Language[];
  repositoriesAlreadyStarred?: string[];
}

type RepositoriesProviderProps = PropsWithChildren<RepositoriesContext>;

const RepositoriesContext = createContext<RepositoriesContext | null>(null);

export const RepositoriesProvider = ({
  user,
  likes,
  languages,
  repositoriesAlreadyStarred,
  children,
}: RepositoriesProviderProps) => {
  return (
    <RepositoriesContext.Provider
      value={{ user, likes, languages, repositoriesAlreadyStarred }}
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
