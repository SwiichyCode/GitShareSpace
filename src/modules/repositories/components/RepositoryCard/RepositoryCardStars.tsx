import { StarIcon, StarFillIcon } from "@primer/octicons-react";
import { formatStarsCount } from "@/modules/repositories/utils/formatStarsCount";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCardStars = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  return (
    <div className="flex items-center space-x-1">
      {repositoriesAlreadyStarred?.includes(repository.url) ? (
        <StarFillIcon className="h-4 w-4 text-[#E3B341]" />
      ) : (
        <StarIcon className="h-4 w-4" />
      )}
      <span>{formatStarsCount(repository.repositoryStargazers)}</span>
    </div>
  );
};
