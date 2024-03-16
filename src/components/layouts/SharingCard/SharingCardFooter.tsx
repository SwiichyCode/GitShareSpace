import type { PropsWithChildren } from "react";

export const SharingCardFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-between space-x-4 pt-2 text-xs text-icon">
      {children}
    </div>
  );
};
