import { getServerAuthSession } from "@/server/auth";
import {
  getRepositoriesOnScroll,
  getUser,
  getLikes,
  getLanguages,
} from "@/actions/test.action";

type Props = {
  query?: string;
  language?: string;
};

export const repositoriesDataSupplier = async ({ query, language }: Props) => {
  const session = await getServerAuthSession();
  const { data } = await getRepositoriesOnScroll({
    query,
    language,
  });

  const user = await getUser(session?.user.id ?? "");
  const likes = await getLikes();
  const languages = await getLanguages();
  return { user, data, likes, languages };
};
