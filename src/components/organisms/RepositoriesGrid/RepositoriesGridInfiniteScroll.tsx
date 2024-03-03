"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "./RepositoriesGridLayout";
import { useRepositoriesContext } from "@/context/repositoriesContext";
import { useToggleFilter } from "@/stores/useToggleFilter";
import { getFilteredRepositories } from "@/utils/getFilteredRepositories";

type Props = {
  query: string;
  language: string;
};

export const RepositoriesGridInfiniteScroll = ({ query, language }: Props) => {
  const { data: initialRepositories, user } = useRepositoriesContext();
  const { repositories, repositoriesAlreadyStarred, ref, isDisabled } =
    useInfiniteScroll({
      initialRepositories,
      limit: 20,
      user,
    });

  const { toggleFilter } = useToggleFilter();

  const filteredRepositories = getFilteredRepositories({
    query,
    language,
    initialRepositories,
    repositories,
    user,
    toggleFilter,
  });

  console.log("rerendering RepositoriesGridInfiniteScroll");

  return (
    <>
      <RepositoriesGridLayout>
        {filteredRepositories.map((repository) => (
          <RepositoryCard
            key={repository.id}
            user={user}
            repository={repository}
            repositoriesAlreadyStarred={repositoriesAlreadyStarred}
          />
        ))}
      </RepositoriesGridLayout>
      <RepositoriesLoader isDisabled={isDisabled} ref={ref} />
    </>
  );
};
