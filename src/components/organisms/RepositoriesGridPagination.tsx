import likeService from "@/services/like.service";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";
import { getRepositoryAlreadyStarred } from "@/lib/utils";
import type { Repository, User } from "@/types/prisma.type";

type Props = {
  user: User | null;
  repositories: Repository[];
};

export const RepositoriesGrid = async ({ user, repositories }: Props) => {
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
