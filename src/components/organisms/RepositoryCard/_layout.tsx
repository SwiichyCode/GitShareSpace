import type { PropsWithChildren } from "react";

export const RepositoryCardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full max-w-[450px] flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-default p-2 shadow md:max-w-none">
      {children}
    </div>
  );
};
