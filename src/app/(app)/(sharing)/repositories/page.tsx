import { QueryParamsProvider } from "@/modules/repositories/context/queryParamsContext";
import { RepositoriesProvider } from "@/modules/repositories/context/repositoriesContext";
import { useFetchRepositoriesPage } from "@/modules/repositories/hooks/use-fetch-repositories-page";
import { useQueryParser } from "@/modules/repositories/hooks/use-query-parser";
import { SharingFilter } from "@/components/layouts/SharingFilter/_index";
import { RepositoriesList } from "@/modules/repositories/components/RepositoriesList";
import { DataSharingAgreementForm } from "@/modules/repositories/components/_forms/data-sharing-agreement-form";
import { AddRepositoryForm } from "@/modules/repositories/components/_forms/add-repository-form";
import { PersonalAccessTokenModal } from "@/modules/repositories/components/PersonalAccessTokenModal";

type PageProps = {
  searchParams?: {
    query?: string;
    language?: string;
    params?: string;
  };
};

export default async function RepositoriesPage({ searchParams }: PageProps) {
  const { user, likes, languages } = await useFetchRepositoriesPage();
  const { queryParams, languageParams, params } = useQueryParser({
    searchParams,
  });

  return (
    <RepositoriesProvider user={user} likes={likes} languages={languages}>
      <QueryParamsProvider
        queryParams={queryParams}
        languageParams={languageParams}
        params={params}
      >
        <SharingFilter />
        <RepositoriesList />
        <AddRepositoryForm />
        <DataSharingAgreementForm />
        <PersonalAccessTokenModal />
      </QueryParamsProvider>
    </RepositoriesProvider>
  );
}
