"use client";

import type { Project } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ProjectDialogs } from "@/modules/projects/components/_dialogs/project-dialogs";
import { CustomLink } from "@/components/ui/link";

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => {
      return (
        <CustomLink href={`/projects/${props.row.original.id}`}>
          {props.row.original.name}
        </CustomLink>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "deleteProject",
    header: "Delete",

    cell: (props) => {
      return <ProjectDialogs projectId={props.row.original.id} />;
    },
  },
];
