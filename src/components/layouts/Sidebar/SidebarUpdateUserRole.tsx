"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { UpdateUserRoleForm } from "@/modules/repositories/components/_forms/update-user-role-form";

export const SidebarUpdateUserRole = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <button
          className="hover:bg-subtle-hover flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition"
          type="submit"
        >
          <TrashIcon className="text-subtle h-4 w-4" />
          <span>Update user role</span>
        </button>
      }
    >
      <UpdateUserRoleForm />
    </DialogWrapper>
  );
};
