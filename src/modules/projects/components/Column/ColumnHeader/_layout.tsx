import type { PropsWithChildren } from "react";

export const ColumnHeaderLayout = ({ children }: PropsWithChildren) => {
  return <header className="space-y-2 p-3">{children}</header>;
};
