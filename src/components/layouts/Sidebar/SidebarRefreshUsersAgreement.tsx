"use client";
import { useTransition } from "react";
import { FileSymlinkFileIcon } from "@primer/octicons-react";
import { refreshUsersAgreementAction } from "@/services/actions/refresh-users-agreement";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarRefreshUsersAgreement = () => {
  const [isPending, startTransition] = useTransition();

  const handleRefreshAgreement = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      await refreshUsersAgreementAction({});
    });
  };

  return (
    <form onSubmit={handleRefreshAgreement}>
      <SidebarNavigationButton type="submit">
        <FileSymlinkFileIcon className="h-4 w-4 text-subtle" />
        <span>{isPending ? "Refreshing..." : "Refresh users agreement"}</span>
      </SidebarNavigationButton>
    </form>
  );
};
