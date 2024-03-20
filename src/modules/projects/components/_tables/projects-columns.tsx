"use client";

import type { Project } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const projectColumns: ColumnDef<Project | undefined>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
