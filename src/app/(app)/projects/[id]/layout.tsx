import type { PropsWithChildren } from "react";

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-[calc(100vh-73px)] max-w-full bg-[#0D1117] p-6">
      {children}
    </div>
  );
}
