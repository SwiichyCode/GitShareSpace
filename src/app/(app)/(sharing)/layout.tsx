import type { PropsWithChildren } from "react";

export default function RepositoriesLayout({ children }: PropsWithChildren) {
  return <div className="space-y-8 p-8">{children}</div>;
}
