"use client";
import { ColumnColor } from "./ColumnColor";
import { ColumnName } from "./ColumnName";
import { ColumnCount } from "./ColumnCount";
import { ColumnAction } from "./ColumnAction/_index";
import { ColumnDescription } from "./ColumnDescription";
import { useColumnContext } from "@/modules/projects/context/columnContext";

export const ColumnHeader = () => {
  const {
    column: { id, color, name, description, tasks },
  } = useColumnContext();

  return (
    <header className="space-y-2 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <ColumnColor color={color} />
          <ColumnName name={name} />
          <ColumnCount tasks={tasks} />
        </div>
        <ColumnAction columnId={id} tasks={tasks} />
      </div>
      <ColumnDescription description={description} />
    </header>
  );
};
