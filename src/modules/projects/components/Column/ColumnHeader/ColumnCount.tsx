import type { Task } from "@prisma/client";

type Props = {
  tasks: Task[];
};

export const ColumnCount = ({ tasks }: Props) => {
  return (
    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[20px] bg-[#2D3139]">
      <span className="font-bold text-[#848D97]">{tasks.length}</span>
    </div>
  );
};
