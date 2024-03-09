import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export const RepositoryCardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "border-card flex w-full max-w-[450px] flex-col justify-between space-y-4 overflow-hidden rounded-md border bg-[#0D1117] p-2 shadow md:max-w-none",
      )}
    >
      {children}
    </div>
  );
};
