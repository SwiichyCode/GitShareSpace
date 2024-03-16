"use client";
import { useRepositoriesContext } from "@/modules/repositories/context/repositoriesContext";
import { useQueryParamsContext } from "@/modules/repositories/context/queryParamsContext";
import { useFetchInfiniteRepositories } from "@/modules/repositories/hooks/use-fetch-infinite-repositories";
import { useFetchNextPage } from "@/modules/repositories/hooks/use-fetch-next-page";
import { RepositoryCard } from "@/modules/repositories/components/RepositoryCard/_index";
import { InfinitelistObserver } from "@/components/layouts/InfinitelistObserver";
import { RepositoriesGridLayout } from "@/modules/repositories/components/RepositoriesGridLayout";
import { getRepositoriesAlreadyStarredID } from "@/modules/repositories/utils/getRepositoriesAlreadyStarredID";

export const RepositoriesList = () => {
  const { user } = useRepositoriesContext();
  const { queryParams, languageParams, params } = useQueryParamsContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchInfiniteRepositories({ queryParams, languageParams, params });
  const { ref } = useFetchNextPage({
    action: fetchNextPage,
    hasNextPage,
  });

  const flatRepositories =
    data?.pages.map((page) => page?.data?.repositories ?? []).flat() ?? [];

  return (
    <>
      <RepositoriesGridLayout>
        {flatRepositories.map((repository, index) =>
          repository ? (
            <RepositoryCard
              key={index}
              repository={repository}
              repositoriesAlreadyStarred={getRepositoriesAlreadyStarredID(
                flatRepositories,
                user,
              )}
            />
          ) : (
            <p key={index}>Repository not found</p>
          ),
        )}
      </RepositoriesGridLayout>
      <InfinitelistObserver
        text="Loading more repositories..."
        isLoading={isLoading}
        isDisabled={isFetchingNextPage}
        ref={ref}
      />
    </>
  );
};
