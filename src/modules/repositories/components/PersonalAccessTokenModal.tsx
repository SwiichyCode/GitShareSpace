"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePersonalAccessTokenModal } from "@/modules/repositories/stores/usePersonalAccessTokenModal";
import { AddPersonalAccessTokenForm } from "@/modules/settings/components/_forms/add-personnal-access-token-form";

export const PersonalAccessTokenModal = () => {
  const { open } = usePersonalAccessTokenModal();

  return (
    <Dialog open={open}>
      <DialogContent>
        <AddPersonalAccessTokenForm />
      </DialogContent>
    </Dialog>
  );
};
