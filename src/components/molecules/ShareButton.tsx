"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/button";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";
import { RepoIcon } from "@primer/octicons-react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const ShareButton = ({ session }: Props) => {
  const { setOpen } = useShareRepositoryModal();

  const handleOpen = async () => {
    session ? setOpen(true) : await signIn("github");
  };

  return (
    <Button variant={"success"} onClick={handleOpen} className="space-x-2">
      <RepoIcon className="h-5 w-5" />{" "}
      <span className="hidden lg:block">Share repository</span>
    </Button>
  );
};
