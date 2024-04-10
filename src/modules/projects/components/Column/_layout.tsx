import type { PropsWithChildren } from "react";

export const ColumnsLayout = ({ children }: PropsWithChildren) => {
  return <main className="flex h-full gap-4 overflow-auto">{children}</main>;
};
