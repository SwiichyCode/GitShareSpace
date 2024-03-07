import { getServerAuthSession } from "@/server/auth";
import {
  getRepositoriesOnScroll,
  getUser,
  getLikes,
  getLanguages,
} from "@/actions/test.action";

import repositoryService from "@/services/repository.service";

export const useFetchCommentsPage = async (repositoryId: number) => {
  const session = await getServerAuthSession();
  const repository = await repositoryService.getRepository(repositoryId);
  const comments =
    await repositoryService.getCommentsByRepositoryId(repositoryId);

  const user = await getUser(session?.user.id ?? "");

  return { repository, comments, session, user };
};
