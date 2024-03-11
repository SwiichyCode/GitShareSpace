"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { UpdateUserRoleForm } from "@/modules/repositories/components/_forms/update-user-role-form";
import { SidebarNavigationButton } from "./SidebarNavigationButton";

export const SidebarUpdateUserRole = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <SidebarNavigationButton type="button">
          <TrashIcon className="h-4 w-4 text-subtle" />
          <span>Update user role</span>
        </SidebarNavigationButton>
      }
    >
      <UpdateUserRoleForm />
    </DialogWrapper>
  );
};
