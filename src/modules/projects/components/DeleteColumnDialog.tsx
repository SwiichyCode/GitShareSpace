"use client";
import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { useActionDialog } from "../stores/useActionDialog";
import { removeColumnAction } from "@/services/actions/remove-column";

type Props = {
  projectId: string;
  columnId: string;
};

export const DeleteColumnDialog = ({ projectId, columnId }: Props) => {
  const { dialogs, setOpen } = useActionDialog();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await removeColumnAction({ columnId, projectId });

      setOpen("column", false);
    });
  };

  return (
    <Dialog
      open={dialogs["column"]}
      onOpenChange={() => setOpen("column", false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete column</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>
            This column content items. Are you sure you want to delete this
            column?
          </p>
        </DialogDescription>

        <DialogFooter>
          <form onSubmit={handleDelete} className=" space-x-4">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => setOpen("column", false)}
            >
              Cancel
            </Button>
            <SubmitButton variant={"destructive"} isPending={isPending}>
              Delete
            </SubmitButton>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
