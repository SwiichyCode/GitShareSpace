"use client";
import { useTransition } from "react";
import { FileSymlinkFileIcon } from "@primer/octicons-react";
import { refreshAgreementAction } from "@/services/actions/refresh-agreement";

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
      <button
        className="hover:bg-subtle-hover flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition"
        type="submit"
      >
        <FileSymlinkFileIcon className="text-subtle h-4 w-4" />
        <span>{isPending ? "Refreshing..." : "Refresh agreement"}</span>
      </button>
    </form>
  );
};
