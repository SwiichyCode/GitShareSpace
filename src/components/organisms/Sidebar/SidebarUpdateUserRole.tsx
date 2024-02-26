"use client";

import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/organisms/DialogWrapper";
import { UpdateUserRoleForm } from "../_forms/updateuserrole.form";

export const SidebarUpdateUserRole = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <button
          className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm transition hover:bg-subtleHover"
          type="submit"
        >
          <TrashIcon className="h-4 w-4 text-subtle" />
          <span>Update user role</span>
        </button>
      }
    >
      <UpdateUserRoleForm />
    </DialogWrapper>
  );
};
