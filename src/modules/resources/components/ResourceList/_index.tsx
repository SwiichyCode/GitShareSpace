"use client";
import { ResourceListLayout } from "./_layout";
import { ResourceCard } from "@/modules/resources/components/ResourceCard/_index";
import { useFetchResourceRepositories } from "../../hooks/use-fetch-infinite-resource";
import { useQueryParamsContext } from "@/modules/repositories/context/queryParamsContext";
import { InfinitelistObserver } from "@/components/layouts/InfinitelistObserver";
import { useFetchNextPage } from "@/modules/repositories/hooks/use-fetch-next-page";

export const ResourceList = () => {
  const { queryParams, typeParams, params } = useQueryParamsContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchResourceRepositories({ queryParams, typeParams, params });
  const { ref } = useFetchNextPage({
    action: fetchNextPage,
    hasNextPage,
  });
  const flatResources =
    data?.pages.map((page) => page?.data?.resources ?? []).flat() ?? [];

  return (
    <>
      <ResourceListLayout>
        {flatResources.map((resource, index) =>
          resource ? (
            <ResourceCard key={index} resource={resource} />
          ) : (
            <p key={index}>Resource not found</p>
          ),
        )}
      </ResourceListLayout>
      <InfinitelistObserver
        text="Loading more resources..."
        isLoading={isLoading}
        isDisabled={isFetchingNextPage}
        ref={ref}
      />
    </>
  );
};
