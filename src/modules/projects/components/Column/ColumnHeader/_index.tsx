"use client";
import { ColumnHeaderLayout } from "./_layout";
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
    <ColumnHeaderLayout>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <ColumnColor color={color} />
          <ColumnName name={name} />
          <ColumnCount tasks={tasks} />
        </div>
        <ColumnAction columnId={id} />
      </div>
      <ColumnDescription description={description} />
    </ColumnHeaderLayout>
  );
};
