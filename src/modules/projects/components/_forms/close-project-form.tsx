"use client";

import { closeProjectAction } from "@/services/actions/close-project";
import { useTransition } from "react";
import { DeleteActionBtn } from "../DeleteActionBtn";

type Props = {
  projectId: string;
  setOpen: (open: boolean) => void;
};

export const CloseProjectForm = ({ projectId, setOpen }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await closeProjectAction({ projectId });
      setOpen(false);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <DeleteActionBtn text="Close project" />
    </form>
  );
};
