import { FileSymlinkFileIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { SidebarNavigationButton } from "./SidebarNavigationButton";
import { RefreshUserAgreementForm } from "@/modules/repositories/components/_forms/refresh-user-agreement-form";

export const SidebarRefreshUserAgreement = () => {
  return (
    <DialogWrapper
      triggerChildren={
        <SidebarNavigationButton type="button">
          <FileSymlinkFileIcon className="h-4 w-4 text-subtle" />
          <span>Refresh user agreement</span>
        </SidebarNavigationButton>
      }
    >
      <RefreshUserAgreementForm />
    </DialogWrapper>
  );
};
