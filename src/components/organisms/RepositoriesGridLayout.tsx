import type { PropsWithChildren } from "react";

export const RepositoriesGridLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};
