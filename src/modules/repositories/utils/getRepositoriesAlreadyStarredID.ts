import type { User, Repository } from "@/config/types/prisma.type";

export const getRepositoriesAlreadyStarredID = (
  repositories: Repository[],
  user: User | null,
) => {
  const repositoriesFromDatabase = repositories.map(
    (repository) => repository.repositoryId,
  );
  const repositoriesFromUser = user?.repositoryAlreadyStarred.map(
    (repository) => repository,
  );

  const alreadyStarred = repositoriesFromUser?.filter(
    (repositoryAlreadyStarred) =>
      repositoriesFromDatabase.includes(repositoryAlreadyStarred),
  );

  return alreadyStarred;
};
