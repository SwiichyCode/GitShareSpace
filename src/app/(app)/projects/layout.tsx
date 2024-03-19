import React, { PropsWithChildren } from "react";

export default function ProjectsLayout({ children }: PropsWithChildren) {
  return <div className="m-auto max-w-3xl py-14">{children}</div>;
}
