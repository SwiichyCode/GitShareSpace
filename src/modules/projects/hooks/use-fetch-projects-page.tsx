import { getServerAuthSession } from "@/config/server/auth";
import projectService from "@/services/project.service";

export const useFetchProjectsPage = async () => {
  const session = await getServerAuthSession();

  const projects = await projectService.getUserProjects({
    userId: session?.user.id ?? "",
  });

  return { projects };
};
