"use client";
import { Button } from "@/components/atoms/button";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";
import { RepoIcon } from "@primer/octicons-react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const ShareButton = ({ session }: Props) => {
  const { setOpen } = useShareRepositoryModal();

  return (
    session && (
      <Button
        variant={"success"}
        onClick={() => setOpen(true)}
        className="space-x-2"
      >
        <RepoIcon className="h-5 w-5" /> <span>Share repository</span>
      </Button>
    )
  );
};
