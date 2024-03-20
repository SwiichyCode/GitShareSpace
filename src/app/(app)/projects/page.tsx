import { useFetchProjectsPage } from "@/modules/projects/hooks/use-fetch-projects-page";
import { PresentationalCard } from "@/modules/projects/components/PresentationalCard";
import { ProjectsTable } from "@/modules/projects/components/_tables/projects-table";
import { AddProjectForm } from "@/modules/projects/components/_forms/add-project-form";

export default async function ProjectsPage() {
  const { projects } = await useFetchProjectsPage();

  return (
    <div className="m-auto max-w-3xl space-y-8 p-14">
      <PresentationalCard />
      <AddProjectForm />
      {projects && <ProjectsTable projects={projects} />}
    </div>
  );
}
