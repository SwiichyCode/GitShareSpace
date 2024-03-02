import { getServerAuthSession } from "@/server/auth";
import {
  getRepositoriesOnScroll,
  getUser,
  getLikes,
} from "@/actions/test.action";

type Props = {
  query?: string;
};

export const repositoriesDataSupplier = async ({ query }: Props) => {
  const session = await getServerAuthSession();

  const { data } = await getRepositoriesOnScroll({
    query,
  });

  const user = await getUser(session?.user.id ?? "");
  const likes = await getLikes();

  return { user, data, likes };
};
