import type { PropsWithChildren } from "react";

export const SharingCardBody = ({ children }: PropsWithChildren) => {
  return <div className="space-y-2 rounded-sm bg-overlay p-3">{children}</div>;
};
