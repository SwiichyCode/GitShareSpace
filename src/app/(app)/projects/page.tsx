import { useFetchProjectsPage } from "@/modules/projects/hooks/use-fetch-projects-page";
import { PresentationalCard } from "@/modules/projects/components/PresentationalCard";
import { ProjectsTable } from "@/modules/projects/components/_tables/projects-table";
import { AddProjectForm } from "@/modules/projects/components/_forms/add-project-form";
import { ProjectsNavigation } from "@/modules/projects/components/ProjectsNavigation";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { query } = searchParams;

  const { projects } = await useFetchProjectsPage();

  return (
    <div className="m-auto max-w-3xl space-y-8 p-14">
      <PresentationalCard />
      <AddProjectForm />

      {projects && (
        <div className="flex flex-col gap-6">
          <ProjectsNavigation />
          <ProjectsTable projects={projects} />
        </div>
      )}
    </div>
  );
}
