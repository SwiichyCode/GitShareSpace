import { useFetchProjectPage } from "@/modules/projects/hooks/use-fetch-project-page";
import { ColumnsList } from "@/modules/projects/components/Column/ColumnsList";
import { Column } from "@/modules/projects/components/Column/_index";
import { ProjectProvider } from "@/modules/projects/context/projectContext";
import { ColumnProvider } from "@/modules/projects/context/columnContext";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { project } = await useFetchProjectPage({ projectId: params.id });
  if (!project) return null;

  return (
    <ProjectProvider project={project}>
      <ColumnsList>
        {project?.columns.map((column) => (
          <ColumnProvider key={column.id} column={column}>
            <Column key={column.id} />
          </ColumnProvider>
        ))}
      </ColumnsList>
    </ProjectProvider>
  );
}
