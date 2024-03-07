"use client";

import { useFetchInfiniteRepositories } from "@/hooks/useFetchInfiniteRepositories";
import { useFetchNextPage } from "@/hooks/useFetchNextPage";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "@/components/organisms/RepositoriesGrid/RepositoriesGridLayout";
import { getRepositoriesAlreadyStarredURL } from "@/utils/getRepositoriesAlreadyStarredURL";
import type { User } from "@/types/prisma.type";
import { getFilteredRepositories } from "@/utils/getFilteredRepositories";
import { useToggleFilter } from "@/stores/useToggleFilter";

type Props = {
  user: User | null;
  queryParams: string;
  languageParams: string;
};

export const RepositoriesGridInfiniteScroll = ({
  user,
  queryParams,
  languageParams,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useFetchInfiniteRepositories({ queryParams, languageParams });

  const { ref } = useFetchNextPage({
    action: fetchNextPage,
    hasNextPage,
  });

  // const { toggleFilter } = useToggleFilter();

  const flatRepositories =
    data?.pages.map((page) => page.data!.repositories).flat() || [];

  // const filteredRepositories = getFilteredRepositories({
  //   query: queryParams,
  //   language: languageParams,
  //   repositories: flatRepositories,
  //   user,
  //   toggleFilter,
  // });

  return (
    <>
      <RepositoriesGridLayout>
        {flatRepositories.map((repository, index) =>
          repository ? (
            <RepositoryCard
              key={index}
              user={user}
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
      <RepositoriesLoader isDisabled={isFetchingNextPage} ref={ref} />
    </>
  );
};
