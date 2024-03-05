"use client";

import { useFetchInfiniteRepositories } from "@/hooks/useFetchInfiniteRepositories";
import { useFetchNextPage } from "@/hooks/useFetchNextPage";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "./RepositoriesGridLayout";
import { User } from "@/types/prisma.type";

type Props = {
  user: User | null;
  query: string;
  language: string;
};

export const RepositoriesGridInfiniteScroll = ({
  user,
  query,
  language,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfiniteRepositories({ query, language });

  const { ref } = useFetchNextPage({
    action: fetchNextPage,
    hasNextPage,
  });

  return (
    <>
      {data?.pages.map((page, i) => (
        <RepositoriesGridLayout key={i}>
          {page.data.map((repository) => (
            <RepositoryCard
              key={repository.id}
              user={user}
              repository={repository}
              // repositoriesAlreadyStarred={repositoriesAlreadyStarred}
            />
          ))}
        </RepositoriesGridLayout>
      ))}
      <RepositoriesLoader isDisabled={isFetchingNextPage} ref={ref} />
    </>
  );
};
