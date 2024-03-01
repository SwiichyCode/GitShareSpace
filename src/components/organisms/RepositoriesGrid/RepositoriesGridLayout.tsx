import type { PropsWithChildren } from "react";

export const RepositoriesGridLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto grid max-w-[1920px] grid-cols-1 place-items-center gap-4 md:w-full md:grid-cols-2 md:place-items-stretch xl:grid-cols-3 2xl:grid-cols-4">
      {children}
    </div>
  );
};
