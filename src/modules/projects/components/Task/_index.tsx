"use client";
import { useColumnContext } from "@/modules/projects/context/columnContext";
import { TaskCard } from "./TaskCard/_index";
import { TaskListLayout } from "./_layout";

export const TasksList = () => {
  const {
    column: { tasks },
  } = useColumnContext();

  return (
    <TaskListLayout>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </TaskListLayout>
  );
};
