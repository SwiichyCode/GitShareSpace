import { ColumnHeader } from "./ColumnHeader/_index";
import { TasksList } from "@/modules/projects/components/Task/_index";
import { AddTaskDialog } from "@/modules/projects/components/Task/AddTaskDialog";

export const Column = () => {
  return (
    <section className="relative h-full min-w-[350px] rounded-md border border-card bg-background">
      <ColumnHeader />
      <TasksList />
      <AddTaskDialog />
    </section>
  );
};
