import type { PropsWithChildren } from "react";

export const SharingCardLayout = ({ children }: PropsWithChildren) => {
  return (
    <article className="flex w-full max-w-[450px] flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-[#0D1117] p-2 shadow md:max-w-none">
      {children}
    </article>
  );
};
