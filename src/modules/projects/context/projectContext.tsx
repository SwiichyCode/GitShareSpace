"use client";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { Project } from "@/config/types/prisma.type";

interface ProjectContext {
  project: Project;
}

type ProjectProviderProps = PropsWithChildren<ProjectContext>;

const ProjectContext = createContext<ProjectContext | null>(null);

export const ProjectProvider = ({
  project,
  children,
}: ProjectProviderProps) => {
  return (
    <ProjectContext.Provider value={{ project }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectsContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsProvider",
    );
  }

  return context;
};
