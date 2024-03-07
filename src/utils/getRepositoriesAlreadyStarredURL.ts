import type { User, Repository } from "@/types/prisma.type";

export const getRepositoriesAlreadyStarredURL = (
  repositories: Repository[],
  user: User | null,
) => {
  const repositoriesFromDatabase = repositories.map(
    (repository) => repository.url,
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
