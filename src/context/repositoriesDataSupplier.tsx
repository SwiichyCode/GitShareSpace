import { getServerAuthSession } from "@/server/auth";
// import repositoryService from "@/services/repository.service";
import likeService from "@/services/like.service";
import userService from "@/services/user.service";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
// import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";
import {
  getRepositories,
  getRepositoriesOnScroll,
} from "@/actions/test.action";

type Props = {
  query?: string;
};

export const repositoriesDataSupplier = async ({ query }: Props) => {
  const session = await getServerAuthSession();

  const { data } = await getRepositoriesOnScroll({
    query,
  });

  const repositories = await getRepositories();
  const user = await userService.getUser(session?.user.id ?? "");
  const likes = await likeService.getLikes();
  const repositoriesAlreadyStarred = getRepositoryAlreadyStarred(
    repositories,
    user,
  );

  return { user, data, likes, repositoriesAlreadyStarred };
};
