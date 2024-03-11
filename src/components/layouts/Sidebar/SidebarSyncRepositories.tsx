"use client";
import { useTransition } from "react";
import { syncRepositoriesAction } from "@/services/actions/sync-repositories";
import { SyncIcon } from "@primer/octicons-react";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarSyncRepositories = () => {
  const [isPending, startTransition] = useTransition();

  const handleSyncRepositories = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      await syncRepositoriesAction();
    });
  };

  return (
    <form onSubmit={handleSyncRepositories}>
      <SidebarNavigationButton type="submit">
        <SyncIcon className="h-4 w-4 text-subtle" />
        <span>{isPending ? "Syncing..." : "Sync repositories"}</span>
      </SidebarNavigationButton>
    </form>
  );
};
