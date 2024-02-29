import { RepositoryCardLike } from "./RepositoryCardLike";
import { RepositoryCardLicense } from "./RepositoryCardLicense";
import { RepositoryCardStars } from "./RepositoryCardStars";
import { RepositoryCardLanguage } from "./RepositoryCardLanguage";
import { RepositoryCardComment } from "./RepositoryCardComment";
import type { Repository } from "@/types/prisma.type";
import type { User } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCardFooter = ({
  user,
  likes,
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  return (
    <div className="flex justify-between space-x-4 pt-2 text-xs text-[#848D97]">
      <div className="flex space-x-4">
        <RepositoryCardLanguage repository={repository} />
        <RepositoryCardStars
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
        <RepositoryCardLicense repository={repository} />
      </div>
      <div className="flex space-x-4">
        <RepositoryCardComment repository={repository} />
        <RepositoryCardLike user={user} repository={repository} likes={likes} />
      </div>
    </div>
  );
};
