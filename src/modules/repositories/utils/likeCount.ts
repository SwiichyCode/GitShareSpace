import type { Repository } from "@/config/types/prisma.type";
import type { Like } from "@prisma/client";

export const likeCount = (likes: Like[], repository: Repository) => {
  const liked = likes.map((like) => {
    if (like.repositoryId === repository.id) {
      return like;
    }
  });

  const filterLiked = liked.filter((like) => like !== undefined);

  return filterLiked.length;
};
