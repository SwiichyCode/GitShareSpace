"use client";
import { Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { likeRepository } from "@/actions/likerepository.action";
import { handleAlreadyStarredColor } from "@/lib/utils";
import { handleColorByLike } from "@/lib/utils";
import { handleLikeCount } from "@/lib/utils";
import type { Repository } from "@/types/prisma.type";
import type { User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCardFooter = ({
  user,
  likes,
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  // Implement optimistic UI for like interaction

  const handleLikeRepository = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await likeRepository({
      repositoryId: repository.id,
    });
  };

  return (
    <div className="flex justify-between space-x-4 text-xs text-[#848D97]">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-1">
          <span>{repository.language.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star
            className={cn(
              "h-4 w-4",
              handleAlreadyStarredColor(repositoriesAlreadyStarred, repository),
            )}
          />
          <span>{repository.repositoryStargazers}</span>
        </div>
      </div>
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
        <span>{handleLikeCount(likes, repository)}</span>
      </form>
    </div>
  );
};
