"use client";
import { useCallback, useOptimistic, useTransition } from "react";
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

  const handleStarRepository = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      startTransition(async () => {
        if (!user || isPending) return;
        setOptimisticStar(repository.repositoryId);

        await starRepositoryAction({
          owner: repository.ownerUsername,
          repositoryName: repository.repositoryName,
          repositoryId: repository.repositoryId,
        });
      });
    },
    [isPending, repository.repositoryId, setOptimisticStar, startTransition],
  );

  return {
    isPending,
    handleStarRepository,
    optimisticStar,
  };
};
