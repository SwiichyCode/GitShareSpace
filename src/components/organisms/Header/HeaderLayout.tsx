import type { PropsWithChildren } from "react";

export const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex w-full max-w-[1920px] items-center justify-between border-b border-default bg-inset px-6 py-4">
      {children}
    </div>
  );
};
