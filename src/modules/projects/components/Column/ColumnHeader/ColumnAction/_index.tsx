import { KebabHorizontalIcon } from "@primer/octicons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DeleteColumn } from "./DeleteColumn";
import type { Task } from "@prisma/client";

type Props = {
  columnId: string;
  tasks: Task[];
};

export const ColumnAction = ({ columnId, tasks }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center rounded-md px-3 py-2 hover:bg-[#15191E]">
          <KebabHorizontalIcon size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-48 rounded-md border border-card bg-[#161B22] text-default"
      >
        <h3 className="mb-2 text-sm text-[#848d97]">Column</h3>
        <DeleteColumn columnId={columnId} tasks={tasks} />
      </PopoverContent>
    </Popover>
  );
};
