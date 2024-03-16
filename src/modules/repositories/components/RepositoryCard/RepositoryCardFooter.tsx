import { useRepositoriesContext } from "@/modules/repositories/context/repositoriesContext";
import { RepositoryCardLike } from "./RepositoryCardLike";
import { RepositoryCardLicense } from "./RepositoryCardLicense";
import { RepositoryCardStars } from "./RepositoryCardStars";
import { RepositoryCardLanguage } from "./RepositoryCardLanguage";
import { RepositoryCardComment } from "./RepositoryCardComment";
// import { RepositoryCardSeeMore } from "./RepositoryCardSeeMore";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: number[];
};

export const RepositoryCardFooter = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  const { user, likes } = useRepositoriesContext();

  return (
    <>
      <div className="flex space-x-4">
        <RepositoryCardLanguage repository={repository} />
        <RepositoryCardStars
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
        <RepositoryCardLicense repository={repository} />
      </div>
      <div className="flex space-x-4">
        {/* <RepositoryCardSeeMore /> */}
        <RepositoryCardComment repository={repository} />
        <RepositoryCardLike user={user} repository={repository} likes={likes} />
      </div>
    </>
  );
};
