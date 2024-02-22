import { getServerAuthSession } from "@/server/auth";
import repositoryService from "@/services/repository.service";
import userService from "@/services/user.service";
import { RepositoriesGrid } from "@/components/organisms/RepositoriesGrid";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";
import { RepositoriesPagination } from "@/components/organisms/RepositoriesPagination";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
};

export default async function RepositoriesPage({ searchParams }: Props) {
  const search = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 15;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await repositoryService.getRepositoriesByPage({
    offset,
    limit,
    search,
  });

  const session = await getServerAuthSession();
  const user = session && (await userService.getUser(session.user.id));

  return (
    <div className="space-y-8 p-8">
      <RepositoriesGrid user={user} repositories={data} />
      <RepositoriesPagination totalPages={totalPages} />

      {user && <DataSharingAgreementForm user={user} />}
      <AddRepositoryForm />
    </div>
  );
}
