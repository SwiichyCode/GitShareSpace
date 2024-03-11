"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { RemoveStaredRepositoryForm } from "@/modules/repositories/components/_forms/remove-stared-repository-form";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarRemoveStarredRepositories = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <SidebarNavigationButton type="button">
          <TrashIcon className="h-4 w-4 text-subtle" />
          <span>Remove starred repositories</span>
        </SidebarNavigationButton>
      }
    >
      <RemoveStaredRepositoryForm />
    </DialogWrapper>
  );
};
