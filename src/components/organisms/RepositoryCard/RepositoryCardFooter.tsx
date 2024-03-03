import { useRepositoriesContext } from "@/context/repositoriesContext";
import { RepositoryCardLike } from "./RepositoryCardLike";
import { RepositoryCardLicense } from "./RepositoryCardLicense";
import { RepositoryCardStars } from "./RepositoryCardStars";
import { RepositoryCardLanguage } from "./RepositoryCardLanguage";
import { RepositoryCardComment } from "./RepositoryCardComment";
import { RepositoryCardSeeMore } from "./RepositoryCardSeeMore";
import type { Repository } from "@/types/prisma.type";
import type { User } from "@/types/prisma.type";

type Props = {
  user: User | null;
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCardFooter = ({
  user,
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  const { likes } = useRepositoriesContext();

  return (
    <div className="text-icon flex justify-between space-x-4 pt-2 text-xs">
      <div className="flex space-x-4">
        <RepositoryCardLanguage repository={repository} />
        <RepositoryCardStars
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
        <RepositoryCardLicense repository={repository} />
      </div>
      <div className="flex space-x-4">
        <RepositoryCardSeeMore />
        <RepositoryCardComment repository={repository} />
        <RepositoryCardLike user={user} repository={repository} likes={likes} />
      </div>
    </div>
  );
};
