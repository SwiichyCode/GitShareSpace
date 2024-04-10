import { useFetchProjectPage } from "@/modules/projects/hooks/use-fetch-project-page";
import { Column } from "@/modules/projects/components/Column/_index";
import { ProjectProvider } from "@/modules/projects/context/projectContext";
import { ColumnProvider } from "@/modules/projects/context/columnContext";
import { ColumnsLayout } from "@/modules/projects/components/Column/_layout";
import { DeleteColumnDialog } from "@/modules/projects/components/DeleteColumnDialog";

import {
  useQueryParserProjectPage,
  type SearchParamsType,
} from "@/modules/projects/hooks/use-query-parser-project-page";

type PageProps = {
  params: {
    id: string;
  };
} & SearchParamsType;

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const { project } = await useFetchProjectPage({ projectId: params.id });
  const { projectId, columnId } = useQueryParserProjectPage({ searchParams });

  if (!project) return null;

  return (
    <ProjectProvider project={project}>
      <ColumnsLayout>
        {project?.columns.map((column) => (
          <ColumnProvider key={column.id} column={column}>
            <Column key={column.id} />
          </ColumnProvider>
        ))}
      </ColumnsLayout>

      {/* All dialog action  */}
      <DeleteColumnDialog projectId={projectId} columnId={columnId} />
    </ProjectProvider>
  );
}
