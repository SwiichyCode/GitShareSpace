import type { PropsWithChildren } from "react";

export default function LayoutProfile({ children }: PropsWithChildren) {
  return (
    <div className="h-[calc(100vh-73px)] bg-skeleton p-8">
      <div className="m-auto max-w-7xl">{children}</div>
    </div>
  );
}
