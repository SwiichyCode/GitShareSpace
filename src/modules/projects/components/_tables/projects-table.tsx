import { DataTable } from "@/components/ui/datatable";
import { projectColumns } from "./projects-columns";
import type { Project } from "@/config/types/prisma.type";
import { URL } from "@/config/constants";

type Props = {
  projects: Project[];
};

export const ProjectsTable = ({ projects }: Props) => {
  return (
    <DataTable
      columns={projectColumns}
      data={projects}
      route={URL.PROJECTS}
      asRowLink
    />
  );
};
