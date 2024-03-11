"use client";
import { signOut } from "next-auth/react";
import { ArrowLeftIcon } from "@primer/octicons-react";

export const SidebarSignout = () => {
  return (
    <button
      className="flex min-h-7 w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
      onClick={() => signOut()}
    >
      <ArrowLeftIcon className="h-4 w-4 text-subtle" />
      <span className="text-sm">Sign out</span>
    </button>
  );
};
