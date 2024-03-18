import { getServerAuthSession } from "@/config/server/auth";
import repositoryService from "@/services/repository.service";

type Props = {
  repositoryId: number;
};

export const useFetchCommentsPage = async ({ repositoryId }: Props) => {
  const session = await getServerAuthSession();
  const repository = await repositoryService.getRepository({ repositoryId });
  const comments = await repositoryService.getCommentsByRepositoryId({
    repositoryId,
  });

  return { repository, comments, session };
};
