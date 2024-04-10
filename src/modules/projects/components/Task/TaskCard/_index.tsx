import { TaskCardLayout } from "./_layout";
import { TaskCardAction } from "../TaskAction/TaskCardAction";
import { TaskCardDescription } from "./TaskCardDescription";
import type { Task } from "@prisma/client";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const { name } = task;

  return (
    <TaskCardLayout>
      <TaskCardAction />

      <TaskCardDescription description={name} />
    </TaskCardLayout>
  );
};
