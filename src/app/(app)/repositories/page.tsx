import { parseAsString } from "nuqs/server";
import { useFetchRepositoriesPage } from "@/hooks/useFetchRepositoriesPage";
import { RepositoriesProvider } from "@/context/repositoriesContext";
import { RepositoriesFilter } from "@/components/organisms/RepositoriesFilter/_index";
import { RepositoriesGridInfiniteScroll } from "@/components/organisms/RepositoriesGrid/RepositoriesGridInfiniteScroll";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";

type Props = {
  searchParams?: {
    query?: string;
    language?: string;
  };
};

const queryParser = parseAsString.withDefault("");

export default async function RepositoriesPage({ searchParams }: Props) {
  const queryParams = queryParser.parseServerSide(searchParams?.query);
  const languageParams = queryParser.parseServerSide(searchParams?.language);
  const { user, likes, languages } = await useFetchRepositoriesPage();

  return (
    <RepositoriesProvider user={user} likes={likes}>
      <RepositoriesFilter languages={languages} />
      <RepositoriesGridInfiniteScroll
        user={user}
        queryParams={queryParams}
        languageParams={languageParams}
      />
      <DataSharingAgreementForm user={user} />
      <AddRepositoryForm
        queryParams={queryParams}
        languageParams={languageParams}
      />
    </RepositoriesProvider>
  );
}
