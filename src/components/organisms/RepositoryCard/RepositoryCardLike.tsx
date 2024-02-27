"use client";
import { useState, useCallback, useOptimistic } from "react";
import { HeartIcon, HeartFillIcon } from "@primer/octicons-react";
import { likeOrUnlikeRepository } from "@/actions/likerepository.action";
import { cn } from "@/lib/utils";
import { handleLikeCount } from "@/lib/utils";
import { formatNumber, hasLikedRepository } from "@/lib/utils";
import type { Repository } from "@/types/prisma.type";
import type { User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
};

export const RepositoryCardLike = ({ user, repository, likes }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
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

      if (!user || isUpdating) return;

      setIsUpdating(true);

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
      } finally {
        setIsUpdating(false);
      }
    },
    [user, isUpdating, repository.id, setOptimisticLikes],
  );

  return (
    <form
      onSubmit={handleLikeRepository}
      className={cn(
        "flex items-center space-x-1 hover:text-[#FF3E6C]",
        isLiked && "text-[#FF3E6C]",
      )}
    >
      <button type="submit">
        {isLiked ? (
          <HeartFillIcon className={cn("h-4 w-4 hover:cursor-pointer ")} />
        ) : (
          <HeartIcon className={cn("h-4 w-4 hover:cursor-pointer ")} />
        )}
      </button>
      <span>{formatNumber(handleLikeCount(optimisticLikes, repository))}</span>
    </form>
  );
};
