import type { PropsWithChildren } from "react";

export default function SharingLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto flex w-full max-w-[1920px] flex-col items-center px-8 py-8 sm:space-y-8 sm:py-8">
      {children}
    </div>
  );
}
