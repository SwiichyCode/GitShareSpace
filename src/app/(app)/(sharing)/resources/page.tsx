import { SharingFilter } from "@/components/filtering/SharingFilter";
import { QueryParamsProvider } from "@/modules/repositories/context/queryParamsContext";
import { useQueryParser } from "@/modules/repositories/hooks/use-query-parser";
import { ResourceList } from "@/modules/resources/components/ResourceList/_index";
import { AddResourceForm } from "@/modules/resources/components/_forms/add-resource-form";

type PageProps = {
  searchParams?: {
    query?: string;
    params?: string;
  };
};

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { queryParams, typeParams, params } = useQueryParser({
    searchParams,
  });

  return (
    <QueryParamsProvider
      queryParams={queryParams}
      typeParams={typeParams}
      params={params}
    >
      <SharingFilter />
      <ResourceList />
      <AddResourceForm />
    </QueryParamsProvider>
  );
}
