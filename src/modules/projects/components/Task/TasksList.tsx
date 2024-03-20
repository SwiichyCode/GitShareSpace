"use client";
import { useColumnContext } from "@/modules/projects/context/columnContext";

export const TasksList = () => {
  const {
    column: { tasks },
  } = useColumnContext();

  return (
    <div className=" flex h-[calc(100vh-247px)] flex-grow">
      {tasks.map((task) => (
        <div key={task.id} className="mb-3 rounded-md bg-white p-3 shadow-sm">
          <h2 className="mb-2 text-lg font-bold">{task.name}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};
