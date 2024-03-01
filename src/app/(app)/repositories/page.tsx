import { parseAsString } from "nuqs/server";
import { repositoriesDataSupplier } from "@/context/repositoriesDataSupplier";
import { RepositoriesProvider } from "@/context/repositoriesContext";
import { RepositoriesGridInfiniteScroll } from "@/components/organisms//RepositoriesGrid/RepositoriesGridInfiniteScroll";
import { DataSharingAgreementForm } from "@/components/organisms/_forms/dataSharingAgreement.form";
import { AddRepositoryForm } from "@/components/organisms/_forms/addrepository.form";

type Props = {
  searchParams?: {
    query?: string;
  };
};

const queryParser = parseAsString.withDefault("");

export default async function RepositoriesPage({ searchParams }: Props) {
  const query = queryParser.parseServerSide(searchParams?.query);
  const { user, data, likes } = await repositoriesDataSupplier({ query });

  return (
    <RepositoriesProvider user={user} data={data} likes={likes}>
      <RepositoriesGridInfiniteScroll query={query} />

      <DataSharingAgreementForm user={user} />
      <AddRepositoryForm />
    </RepositoriesProvider>
  );
}
