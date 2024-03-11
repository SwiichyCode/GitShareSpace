"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { RemoveRepositoryCommentsForm } from "@/modules/repositories/components/_forms/remove-repository-comments-form";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarRemoveRepositoryComments = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <SidebarNavigationButton type="button">
          <TrashIcon className="h-4 w-4 text-subtle" />
          <span>Remove repository comments</span>
        </SidebarNavigationButton>
      }
    >
      <RemoveRepositoryCommentsForm />
    </DialogWrapper>
  );
};
