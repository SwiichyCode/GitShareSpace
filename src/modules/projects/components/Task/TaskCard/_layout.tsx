import type { PropsWithChildren } from "react";

export const TaskCardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" h-fit w-full space-y-2 rounded-md border border-card bg-[#161B22] p-2">
      {children}
    </div>
  );
};
