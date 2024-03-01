import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useOptimisticLike } from "@/hooks/useOptimisticLike";
import { useLikeConfetti } from "@/hooks/useConfettiLike";
import { HeartIcon, HeartFillIcon } from "@primer/octicons-react";
import { handleLikeCount } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Repository, User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
};

export const RepositoryCardLike = ({ user, repository, likes }: Props) => {
  const { optimisticLikes, handleLikeRepository, isLiked, isUpdating } =
    useOptimisticLike({ user, repository, likes });

  const { onInitHandler, handleShoot } = useLikeConfetti({
    isLiked,
    isUpdating,
  });

  return (
    <form
      onSubmit={handleLikeRepository}
      className={cn(
        "flex items-center space-x-1 hover:text-[#FF3E6C]",
        isLiked && "text-[#FF3E6C]",
      )}
    >
      <Fireworks onInit={onInitHandler} />
      <button type="submit" onClick={handleShoot}>
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
