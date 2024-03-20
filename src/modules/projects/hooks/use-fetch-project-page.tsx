import { getServerAuthSession } from "@/config/server/auth";
import projectService from "@/services/project.service";

type Props = {
  projectId: string;
};

export const useFetchProjectPage = async ({ projectId }: Props) => {
  const session = await getServerAuthSession();
  const project = await projectService.getUserProjectById({
    projectId: projectId,
    userId: session?.user.id ?? "",
  });

  return { project };
};
