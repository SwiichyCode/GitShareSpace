import { useOptimisticLike } from "@/modules/repositories/hooks/use-optimistic-like";
import { HeartIcon, HeartFillIcon } from "@primer/octicons-react";
import { likeCount } from "@/modules/repositories/utils/likeCount";

import { cn } from "@/lib/utils";
import type { Repository, User } from "@/config/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
};

export const RepositoryCardLike = ({ user, repository, likes }: Props) => {
  const { optimisticLikes, handleLikeRepository, isLiked } = useOptimisticLike({
    user,
    repository,
    likes,
  });

  return (
    <form onSubmit={handleLikeRepository}>
      <button
        type="submit"
        className={cn(
          "flex items-center space-x-1",
          isLiked && "text-[#FF3E6C]",
          user ? "cursor-pointer hover:text-[#FF3E6C]" : "cursor-default",
        )}
      >
        {isLiked ? (
          <HeartFillIcon className={cn("h-4 w-4")} />
        ) : (
          <HeartIcon className={cn("h-4 w-4")} />
        )}

        <span>{likeCount(optimisticLikes, repository)}</span>
      </button>
    </form>
  );
};
