import type { PropsWithChildren } from "react";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return <div className="m-auto max-w-96 py-14">{children}</div>;
}
