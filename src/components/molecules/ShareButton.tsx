"use client";
import { Button } from "@/components/atoms/button";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";

export const ShareButton = () => {
  const { setOpen } = useShareRepositoryModal();

  return (
    <Button variant={"success"} onClick={() => setOpen(true)}>
      Share repository
    </Button>
  );
};
