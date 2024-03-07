import { getServerAuthSession } from "@/server/auth";

import {
  getRepository,
  getCommentsByRepositoryId,
} from "@/services/repository.service";

export const useFetchCommentsPage = async (repositoryId: number) => {
  const session = await getServerAuthSession();
  const repository = await getRepository({
    repositoryId,
  });
  const comments = await getCommentsByRepositoryId({
    repositoryId,
  });

  return { repository, comments, session };
};
