"use client";

import { useCallback, useOptimistic, useTransition } from "react";
import { likeOrUnlikeRepository } from "@/services/actions/like-or-unlike-repository";
import { hasLikedRepository } from "@/modules/repositories/utils/hasLikedRepository";
import type { Repository, User } from "@/config/types/prisma.type";
import type { Like } from "@prisma/client";

type UseOptimisticLikeProps = {
  user: User | null;
  repository: Repository;
  likes: Like[];
};

export const useOptimisticLike = ({
  user,
  repository,
  likes,
}: UseOptimisticLikeProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (state, newLike: Like) => {
      if (
        state.some((like) => hasLikedRepository(like, user?.id, repository.id))
      ) {
        return state.filter(
          (like) => !hasLikedRepository(like, user?.id, repository.id),
        );
      }

      return [...state, newLike];
    },
  );

  const isLiked = optimisticLikes.some(
    (like) => like.userId === user?.id && like.repositoryId === repository.id,
  );

  const handleLikeRepository = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      startTransition(async () => {
        if (!user || isPending) return;

        try {
          setOptimisticLikes({
            userId: user.id,
            repositoryId: repository.id,
            id: Math.random(),
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await likeOrUnlikeRepository({
            repositoryId: repository.id,
          });
        } catch (error) {
          console.error(error);
        }
      });
    },
    [user, repository.id, setOptimisticLikes],
  );

  return { optimisticLikes, isLiked, handleLikeRepository, isPending };
};
