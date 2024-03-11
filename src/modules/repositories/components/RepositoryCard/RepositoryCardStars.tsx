import { StarIcon, StarFillIcon } from "@primer/octicons-react";
import { useOptimisticStar } from "@/modules/repositories/hooks/use-optimistic-star";
import { formatStarsCount } from "@/modules/repositories/utils/formatStarsCount";
import type { Repository } from "@/config/types/prisma.type";
import { useRepositoriesContext } from "../../context/repositoriesContext";
import { cn } from "@/lib/utils";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: number[];
};

export const RepositoryCardStars = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  const { user } = useRepositoriesContext();
  const { handleStarRepository, optimisticStar } = useOptimisticStar({
    user,
    repository,
    repositoriesAlreadyStarred: repositoriesAlreadyStarred ?? [],
  });

  return (
    <form onSubmit={handleStarRepository}>
      <button
        type="submit"
        className={cn(
          "flex cursor-default items-center space-x-1 ",
          user && "cursor-pointer hover:text-[#E3B341]",
        )}
      >
        {optimisticStar?.includes(repository.repositoryId) ? (
          <StarFillIcon className="h-4 w-4 text-[#E3B341]" />
        ) : (
          <StarIcon className="h-4 w-4" />
        )}
        <span>{formatStarsCount(repository.repositoryStargazers)}</span>
      </button>
    </form>
  );
};
