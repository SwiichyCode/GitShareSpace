"use client";
import { useTransition } from "react";
import { FileSymlinkFileIcon } from "@primer/octicons-react";
import { refreshAgreement } from "@/actions/refreshagreement.action";

export const SidebarRefreshAgreement = () => {
  const [isPending, startTransition] = useTransition();

  const handleRefreshAgreement = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      const response = await refreshAgreement();

      if (response?.error) {
        alert("Agreement refreshed!");
      } else {
        alert(response?.error);
      }
    });
  };

  return (
    <form onSubmit={handleRefreshAgreement}>
      <button
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition hover:bg-subtleHover"
        type="submit"
      >
        <FileSymlinkFileIcon className="h-4 w-4 text-subtle" />
        <span>{isPending ? "Refreshing..." : "Refresh agreement"}</span>
      </button>
    </form>
  );
};
