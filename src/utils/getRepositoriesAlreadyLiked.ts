import type { User, Repository } from "@/types/prisma.type";

export const getRepositoriesAlreadyLiked = (
  repositories: Repository[],
  user: User | null,
): Repository[] => {
  if (!user || !user.likes) {
    return [];
  }

  const likedRepositoryUrls = user.likes.map((repository) => repository.id);
  const alreadyLikedRepositories = repositories.filter((repository) =>
    likedRepositoryUrls.includes(repository.id),
  );

  return alreadyLikedRepositories;
};
