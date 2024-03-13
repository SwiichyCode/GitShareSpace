import type { PropsWithChildren } from "react";

export default function RepositoryCommentLayout({
  children,
}: PropsWithChildren) {
  return <div className="m-auto max-w-3xl py-12">{children}</div>;
}
