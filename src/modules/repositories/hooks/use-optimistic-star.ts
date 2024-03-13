import { useCallback, useOptimistic, useTransition, useState } from "react";
import { starRepositoryAction } from "@/services/actions/star-repository";
import type { Repository, User } from "@/config/types/prisma.type";

type Props = {
  user: User | null;
  repository: Repository;
  repositoriesAlreadyStarred: number[];
};

export const useOptimisticStar = ({
  user,
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticStar, setOptimisticStar] = useOptimistic(
    repositoriesAlreadyStarred,
    (state, repositoryId: number) => {
      if (state?.includes(repositoryId)) {
        return state.filter((id) => id !== repositoryId);
      }
      return [...state, repositoryId];
    },
  );

  const [optimisticStargazers, setOptimisticStargazers] = useState(
    repository.repositoryStargazers,
  );

  const handleStarRepository = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      startTransition(async () => {
        if (!user || isPending) return;
        setOptimisticStar(repository.repositoryId);

        // Toggle optimisticStargazers based on optimisticStar
        setOptimisticStargazers((prevStargazers) =>
          optimisticStar?.includes(repository.repositoryId)
            ? prevStargazers - 1
            : prevStargazers + 1,
        );

        await starRepositoryAction({
          owner: repository.ownerUsername,
          repositoryName: repository.repositoryName,
          repositoryId: repository.repositoryId,
        });
      });
    },
    [
      isPending,
      repository.repositoryId,
      setOptimisticStar,
      setOptimisticStargazers,
      startTransition,
      user,
    ],
  );

  return {
    isPending,
    handleStarRepository,
    optimisticStargazers,
    optimisticStar,
  };
};
