"use client";
import { useTransition } from "react";
import { syncRepositoriesAction } from "@/services/actions/sync-repositories";
import { SyncIcon } from "@primer/octicons-react";

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
      <button
        className="hover:bg-subtle-hover flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition"
        type="submit"
      >
        <SyncIcon className="text-subtle h-4 w-4" />
        <span>{isPending ? "Syncing..." : "Sync repositories"}</span>
      </button>
    </form>
  );
};
