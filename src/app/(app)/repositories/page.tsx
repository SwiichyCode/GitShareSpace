import { parseAsString } from "nuqs/server";
import { repositoriesDataSupplier } from "@/context/repositoriesDataSupplier";
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
  const query = queryParser.parseServerSide(searchParams?.query);
  const language = queryParser.parseServerSide(searchParams?.language);
  const { user, data, likes, languages } = await repositoriesDataSupplier({
    query,
    language,
  });

  console.log("RepositoriesPage");

  return (
    <RepositoriesProvider user={user} data={data} likes={likes}>
      <RepositoriesFilter languages={languages} />
      <RepositoriesGridInfiniteScroll query={query} language={language} />
      <DataSharingAgreementForm user={user} />
      <AddRepositoryForm />
    </RepositoriesProvider>
  );
}
