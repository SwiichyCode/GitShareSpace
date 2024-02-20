"use client";
import { useState, useOptimistic } from "react";
import { HeartIcon, HeartFillIcon } from "@primer/octicons-react";
import { likeOrUnlikeRepository } from "@/actions/likerepository.action";
import { cn } from "@/lib/utils";
import { handleLikeCount } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
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
      const hasLikedRepository = (like: Like) => {
        return like.userId === user?.id && like.repositoryId === repository.id;
      };

      if (state.some(hasLikedRepository)) {
        // Filtrer le like à retirer en fonction de l'ID de l'utilisateur et du repository
        return state.filter((like) => !hasLikedRepository(like));
      }

      return [...state, newLike];
    },
  );
  const handleLikeRepository = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdating) return;

    setIsUpdating(true);

    try {
      setOptimisticLikes({
        userId: user?.id ?? "",
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
  };

  return (
    <form
      onSubmit={handleLikeRepository}
      className="flex items-center space-x-1"
    >
      <button type="submit">
        {optimisticLikes.some(
          (like) =>
            like.userId === user?.id && like.repositoryId === repository.id,
        ) ? (
          <HeartFillIcon
            className={cn(
              "h-4 w-4 text-[#FF3E6C] hover:cursor-pointer hover:text-[#FF3E6C]",
            )}
          />
        ) : (
          <HeartIcon
            className={cn("h-4 w-4 hover:cursor-pointer hover:text-[#FF3E6C]")}
          />
        )}
      </button>
      <span>{formatNumber(handleLikeCount(optimisticLikes, repository))}</span>
    </form>
  );
};
