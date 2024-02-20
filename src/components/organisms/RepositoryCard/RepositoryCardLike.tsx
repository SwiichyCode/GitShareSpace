"use client";
import { Heart } from "lucide-react";
import {
  likeRepository,
  unlikeRepository,
} from "@/actions/likerepository.action";

import { cn } from "@/lib/utils";
import { handleColorByLike } from "@/lib/utils";
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
  const handleLikeRepository = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasLiked = likes.some(
      (like) => like.userId === user?.id && like.repositoryId === repository.id,
    );

    if (hasLiked) {
      await unlikeRepository({
        repositoryId: repository.id,
      });
    } else {
      await likeRepository({
        repositoryId: repository.id,
      });
    }
  };

  return (
    <form
      onSubmit={handleLikeRepository}
      className="flex items-center space-x-1"
    >
      <button type="submit">
        <Heart
          className={cn(
            "h-4 w-4 hover:cursor-pointer hover:text-[#FF3E6C]",
            handleColorByLike(user, repository),
          )}
        />
      </button>
      <span>{formatNumber(handleLikeCount(likes, repository))}</span>
    </form>
  );
};
