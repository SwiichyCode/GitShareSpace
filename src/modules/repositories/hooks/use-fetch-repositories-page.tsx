import { getServerAuthSession } from "@/config/server/auth";
import userService from "@/services/user.service";
import likeService from "@/services/like.service";
import repositoryService from "@/services/repository.service";

export const useFetchRepositoriesPage = async () => {
  const session = await getServerAuthSession();

  const user = await userService.getUser({ userId: session?.user.id ?? "" });
  const likes = await likeService.getLikes();
  const languages = await repositoryService.getLanguages();

  return { user, likes, languages };
};
