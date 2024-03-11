import type { PropsWithChildren } from "react";

export const AsideLayout = ({ children }: PropsWithChildren) => {
  return <aside className="max-w-xs">{children}</aside>;
};
