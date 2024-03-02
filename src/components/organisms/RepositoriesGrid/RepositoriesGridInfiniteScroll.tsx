"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { RepositoriesLoader } from "@/components/organisms/RepositoriesGrid/RepositoriesLoader";
import { RepositoriesGridLayout } from "./RepositoriesGridLayout";
import { useRepositoriesContext } from "@/context/repositoriesContext";

type Props = {
  query: string;
  language: string;
};

export const RepositoriesGridInfiniteScroll = ({ query, language }: Props) => {
  const { data: initialRepositories, user } = useRepositoriesContext();

  const { repositories, repositoriesAlreadyStarred, ref, isDisable } =
    useInfiniteScroll({
      initialRepositories,
      limit: 20,
      user,
    });

  const dynamicValue = () =>
    query || language ? initialRepositories : repositories;

  return (
    <>
      <RepositoriesGridLayout>
        {dynamicValue().map((repository) => (
          <RepositoryCard
            key={repository.id}
            user={user}
            repository={repository}
            repositoriesAlreadyStarred={repositoriesAlreadyStarred}
          />
        ))}
      </RepositoriesGridLayout>
      <RepositoriesLoader isDisable={isDisable} ref={ref} />
    </>
  );
};
