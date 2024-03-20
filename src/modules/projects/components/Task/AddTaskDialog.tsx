"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskButton } from "@/modules/projects/components/Task/AddTaskButton";
import { AddTaskForm } from "@/modules/projects/components/_forms/add-task-form";

export const AddTaskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddTaskButton />
      </DialogTrigger>
      <DialogContent>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
  );
};
