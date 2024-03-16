import type { PropsWithChildren } from "react";

export const SharingCardHeader = ({ children }: PropsWithChildren) => {
  return <header className="flex justify-between">{children}</header>;
};
