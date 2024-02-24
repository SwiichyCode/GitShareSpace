import { getServerAuthSession } from "@/server/auth";
import userService from "@/services/user.service";
import likeService from "@/services/like.service";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";
import { RepositoriesGridInfiniteScroll } from "@/components/organisms/RepositoriesGridInfiniteScroll";
import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
import { parseAsString } from "nuqs/server";

type Props = {
  searchParams?: {
    query?: string;
  };
};

const queryParser = parseAsString.withDefault("");

export default async function RepositoriesPage({ searchParams }: Props) {
  // const query = searchParams?.query ?? "";
  const query = queryParser.parseServerSide(searchParams?.query);
  const limit = 20;

  const { data: initialData } = await getRepositoriesOnScroll({
    query,
    limit,
  });

  console.log(query);

  const likes = await likeService.getLikes();

  const session = await getServerAuthSession();
  const user = session && (await userService.getUser(session.user.id));
  const repositoriesAlreadyStarred = getRepositoryAlreadyStarred(
    initialData,
    user,
  );

  return (
    <div className="space-y-8 p-8">
      <RepositoriesGridInfiniteScroll
        user={user}
        likes={likes}
        initialData={initialData}
        repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        query={query}
        limit={limit}
      />

      {user && <DataSharingAgreementForm user={user} />}
      <AddRepositoryForm />
    </div>
  );
}
