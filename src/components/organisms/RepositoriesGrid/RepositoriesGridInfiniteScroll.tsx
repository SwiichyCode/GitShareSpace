"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "./RepositoriesGridLayout";
import { useRepositoriesContext } from "@/context/repositoriesContext";

type Props = {
  query: string;
};

export const RepositoriesGridInfiniteScroll = ({ query }: Props) => {
  const { data: initialRepositories, user } = useRepositoriesContext();

  const { repositories, ref, isDisable } = useInfiniteScroll({
    initialRepositories,
    query,
    limit: 20,
  });

  return (
    <>
      <RepositoriesGridLayout>
        {repositories.map((repository) => (
          <RepositoryCard
            key={repository.id}
            user={user}
            repository={repository}
          />
        ))}
      </RepositoriesGridLayout>
      <RepositoriesLoader isDisable={isDisable} ref={ref} />
    </>
  );
};
