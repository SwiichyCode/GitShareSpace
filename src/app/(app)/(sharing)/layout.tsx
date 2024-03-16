import type { PropsWithChildren } from "react";

export default function SharingLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex w-full max-w-[1920px] flex-col items-center space-y-8 p-8">
      {children}
    </div>
  );
}
