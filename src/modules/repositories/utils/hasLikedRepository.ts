import type { Repository, User } from "@/config/types/prisma.type";
import type { Like } from "@prisma/client";

export const hasLikedRepository = (
  like: Like,
  userId: User["id"] | undefined,
  repositoryId: Repository["id"],
) => {
  return like.userId === userId && like.repositoryId === repositoryId;
};
