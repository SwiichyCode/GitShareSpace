"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { RemoveRepositoryCommentsForm } from "@/modules/repositories/components/_forms/remove-repository-comments-form";

export const SidebarRemoveRepositoryComments = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <button
          className="hover:bg-subtle-hover flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition"
          type="submit"
        >
          <TrashIcon className="text-subtle h-4 w-4" />
          <span>Remove repository comments</span>
        </button>
      }
    >
      <RemoveRepositoryCommentsForm />
    </DialogWrapper>
  );
};
