import repositoryService from "@/services/repository.service";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
import type { User } from "@/types/prisma.type";
import likeService from "@/services/like.service";

type Props = {
  user: User | null;
};

export const RepositoryGrid = async ({ user }: Props) => {
  const repositories = await repositoryService.getRepositories();
  const likes = await likeService.getLikes();
  const repositoriesAlreadyStarred = getRepositoryAlreadyStarred(
    repositories,
    user,
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {repositories.map((repository) => (
        <RepositoryCard
          user={user}
          likes={likes}
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
          key={repository.id}
        />
      ))}
    </div>
  );
};
