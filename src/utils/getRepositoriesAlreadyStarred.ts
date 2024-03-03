import type { User, Repository } from "@/types/prisma.type";

export const getRepositoriesAlreadyStarred = (
  repositories: Repository[],
  user: User | null,
): Repository[] => {
  if (!user || !user.repositoryAlreadyStarred) {
    return [];
  }

  const starredRepositoryUrls = user.repositoryAlreadyStarred.map(
    (repository) => repository,
  );
  const alreadyStarredRepositories = repositories.filter((repository) =>
    starredRepositoryUrls.includes(repository.url),
  );

  return alreadyStarredRepositories;
};
