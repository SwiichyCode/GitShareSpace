import { HistoryBackButton } from "@/components/layouts/HistoryBackButton";
import { ErrorBoundary } from "@/config/providers/ErrorBoundary";
import type { PropsWithChildren } from "react";

export default function RepositoryCommentLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="m-auto w-full max-w-3xl space-y-12 py-12">
      <HistoryBackButton />
      <ErrorBoundary fallback="RepositoryCommentLayout...">
        {children}
      </ErrorBoundary>
    </div>
  );
}
