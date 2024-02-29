import { getServerAuthSession } from "@/server/auth";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";
import { RepositoriesGridInfiniteScroll } from "@/components/organisms/RepositoriesGridInfiniteScroll";
import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
import { parseAsString } from "nuqs/server";
import { getLikes } from "@/actions/getLikes.action";
import { getUser } from "@/actions/getUser";

type Props = {
  searchParams?: {
    query?: string;
  };
};

const queryParser = parseAsString.withDefault("");

export default async function RepositoriesPage({ searchParams }: Props) {
  const query = queryParser.parseServerSide(searchParams?.query);
  const limit = 20;

  const { data: initialData } = await getRepositoriesOnScroll({
    query,
    limit,
  });

  const likes = await getLikes();
  const session = await getServerAuthSession();
  const user = session && (await getUser(session.user.id));
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
