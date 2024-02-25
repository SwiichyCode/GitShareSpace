"use client";
import { useTransition } from "react";
import { syncRepositories } from "@/actions/syncrepositories.action";
import { SyncIcon } from "@primer/octicons-react";

export const SidebarSyncRepositories = () => {
  const [isPending, startTransition] = useTransition();

  const handleSyncRepositories = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      await syncRepositories();
    });
  };

  return (
    <form onSubmit={handleSyncRepositories}>
      <button
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition hover:bg-subtleHover"
        type="submit"
      >
        <SyncIcon className="h-4 w-4 text-subtle" />
        <span>{isPending ? "Syncing..." : "Sync repositories"}</span>
      </button>
    </form>
  );
};
