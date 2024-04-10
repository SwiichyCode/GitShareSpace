import { useQueryState } from "nuqs";
import React from "react";

export const ProjectsNavigation = () => {
  const [isClosed, setIsClosed] = useQueryState("isClosed");

  return <div>ProjectsNavigation</div>;
};
