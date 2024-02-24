"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { RepositoryCard } from "./RepositoryCard/_index";
import type { Repository, User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  initialData: Repository[];
  repositoriesAlreadyStarred: string[] | undefined;
  query: string;
  limit: number;
};

export const RepositoriesGridInfiniteScroll = ({
  user,
  likes,
  initialData,
  repositoriesAlreadyStarred,
  query,
  limit,
}: Props) => {
  const { repositories, ref, isDisable } = useInfiniteScroll({
    initialRepositories: initialData,
    query,
    limit,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {repositories.map((repository) => (
          <RepositoryCard
            user={user}
            likes={likes}
            repository={repository}
            repositoriesAlreadyStarred={repositoriesAlreadyStarred}
            key={repository.id}
          />
        ))}
      </div>

      {!isDisable && (
        <div
          ref={ref}
          className="mt-6 flex flex-col items-center justify-center"
        >
          <p className="text-sm text-gray-400">Loading more repositories...</p>
        </div>
      )}
    </>
  );
};
