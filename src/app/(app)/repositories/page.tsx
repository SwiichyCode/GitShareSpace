import { useFetchRepositoriesPage } from "@/hooks/useFetchRepositoriesPage";
import { RepositoriesProvider } from "@/context/repositoriesContext";
import { RepositoriesFilter } from "@/components/organisms/RepositoriesFilter/_index";
import { RepositoriesGridInfiniteScroll } from "@/components/organisms/RepositoriesGrid/RepositoriesGridInfiniteScroll";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";
import { useQueryParser } from "@/hooks/useQueryParser";
import { QueryParamsProvider } from "@/context/queryParamsContext";

type Props = {
  searchParams?: {
    query?: string;
    language?: string;
    params?: string;
  };
};

export default async function RepositoriesPage({ searchParams }: Props) {
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
        <RepositoriesFilter />
        <RepositoriesGridInfiniteScroll />
        <DataSharingAgreementForm />
        <AddRepositoryForm />
      </QueryParamsProvider>
    </RepositoriesProvider>
  );
}
