import { getServerAuthSession } from "@/server/auth";
import {
  getRepositoriesOnScroll,
  getUser,
  getLikes,
  getLanguages,
} from "@/actions/test.action";

export const useFetchRepositoriesPage = async () => {
  const session = await getServerAuthSession();

  const user = await getUser(session?.user.id ?? "");
  const likes = await getLikes();
  const languages = await getLanguages();
  return { user, likes, languages };
};
