import repositoryService from "@/services/repository.service";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
import type { User } from "@prisma/client";

type Props = {
  user: User | null;
};

export const RepositoryGrid = async ({ user }: Props) => {
  const repositories = await repositoryService.getRepositories();
  const repositoriesAlreadyStarred = getRepositoryAlreadyStarred(
    repositories,
    user,
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {repositories.map((repository) => (
        <RepositoryCard
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
          key={repository.id}
        />
      ))}
    </div>
  );
};
