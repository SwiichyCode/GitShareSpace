"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "./DialogWrapper";
import { RemoveStaredRepositoryForm } from "../_forms/removeStaredRepository.form";

export const SidebarRemoveStarredRepositories = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <button
          className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition hover:bg-subtleHover"
          type="submit"
        >
          <TrashIcon className="h-4 w-4 text-subtle" />
          <span>Remove starred repositories</span>
        </button>
      }
    >
      <RemoveStaredRepositoryForm />
    </DialogWrapper>
  );
};
