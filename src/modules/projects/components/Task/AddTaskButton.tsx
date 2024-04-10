import { PlusIcon } from "@primer/octicons-react";
import React from "react";

interface AddTaskButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AddTaskButton = ({ ...props }: AddTaskButtonProps) => {
  return (
    <button
      className="flex h-10 w-full items-center justify-start gap-2 rounded-md px-3 font-light text-[#848d97] hover:bg-[#171B20]"
      {...props}
    >
      <PlusIcon /> <span>Add item</span>
    </button>
  );
};
