import type { Repository } from "@/config/types/prisma.type";

export const hasStarredRepository = (
  repositoryId: Repository["id"],
  repositoriesAlreadyStarred?: number[],
) => {
  return repositoriesAlreadyStarred?.includes(repositoryId);
};
