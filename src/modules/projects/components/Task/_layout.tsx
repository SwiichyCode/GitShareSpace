import type { PropsWithChildren } from "react";

export const TaskListLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" flex h-[calc(100vh-247px)] flex-grow overflow-y-auto p-3">
      {children}
    </div>
  );
};
