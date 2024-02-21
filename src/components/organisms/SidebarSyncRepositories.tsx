"use client";
import { useTransition } from "react";
import { syncRepositories } from "@/actions/syncrepositories.action";

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
    <form
      onSubmit={handleSyncRepositories}
      className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
    >
      <button className="text-sm" type="submit">
        {isPending ? "Syncing..." : "Sync repositories"}
      </button>
    </form>
  );
};
