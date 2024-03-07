"use client";
import { useRepositoriesContext } from "@/context/repositoriesContext";
import { useQueryParamsContext } from "@/context/queryParamsContext";
import { useFetchInfiniteRepositories } from "@/hooks/useFetchInfiniteRepositories";
import { useFetchNextPage } from "@/hooks/useFetchNextPage";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "@/components/organisms/RepositoriesGrid/RepositoriesGridLayout";
import { getRepositoriesAlreadyStarredURL } from "@/utils/getRepositoriesAlreadyStarredURL";

export const RepositoriesGridInfiniteScroll = () => {
  const { user } = useRepositoriesContext();
  const { queryParams, languageParams, params } = useQueryParamsContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchInfiniteRepositories({ queryParams, languageParams, params });
  const { ref } = useFetchNextPage({
    action: fetchNextPage,
    hasNextPage,
  });

  const flatRepositories =
    data?.pages.map((page) => page.data?.repositories ?? []).flat() ?? [];

  return (
    <>
      <RepositoriesGridLayout>
        {flatRepositories.map((repository, index) =>
          repository ? (
            <RepositoryCard
              key={index}
              repository={repository}
              repositoriesAlreadyStarred={getRepositoriesAlreadyStarredURL(
                flatRepositories,
                user,
              )}
            />
          ) : (
            <p key={index}>Repository not found</p>
          ),
        )}
      </RepositoriesGridLayout>
      <RepositoriesLoader
        isLoading={isLoading}
        isDisabled={isFetchingNextPage}
        ref={ref}
      />
    </>
  );
};
