"use client";
import { useTransition } from "react";
import { FileSymlinkFileIcon } from "@primer/octicons-react";
import { refreshAgreementAction } from "@/services/actions/refresh-agreement";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarRefreshAgreement = () => {
  const [isPending, startTransition] = useTransition();

  const handleRefreshAgreement = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      await refreshAgreementAction();
    });
  };

  return (
    <form onSubmit={handleRefreshAgreement}>
      <SidebarNavigationButton type="submit">
        <FileSymlinkFileIcon className="h-4 w-4 text-subtle" />
        <span>{isPending ? "Refreshing..." : "Refresh agreement"}</span>
      </SidebarNavigationButton>
    </form>
  );
};
