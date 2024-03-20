"use client";
import { useTransition } from "react";
import { TrashIcon } from "@primer/octicons-react";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { SubmitButton } from "@/components/ui/submit-button";
import { removeColumnAction } from "@/services/actions/remove-column";
import type { Task } from "@prisma/client";
import { useProjectsContext } from "@/modules/projects/context/projectContext";

type Props = {
  columnId: string;
  tasks: Task[];
};

export const DeleteColumn = ({ columnId, tasks }: Props) => {
  const { project } = useProjectsContext();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await removeColumnAction({ columnId, projectId: project.id });
    });
  };

  return (
    <DialogWrapper
      triggerChildren={
        <button className="flex w-full items-center gap-2 rounded-sm p-2 text-destructive hover:bg-destructive/10">
          <TrashIcon size={16} />
          <span className="text-sm">Delete</span>
        </button>
      }
    >
      <div>
        <h3>Delete column</h3>
        <p>This column content {tasks.length}</p>
        <p>Are you sure you want to delete this column?</p>

        <form onSubmit={handleDelete}>
          <SubmitButton variant={"destructive"} isPending={isPending}>
            Delete
          </SubmitButton>
        </form>
      </div>
    </DialogWrapper>
  );
};
