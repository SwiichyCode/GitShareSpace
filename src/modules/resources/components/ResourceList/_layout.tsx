import type { PropsWithChildren } from "react";

export const ResourceListLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex max-w-xl flex-col gap-8">{children}</div>;
};
