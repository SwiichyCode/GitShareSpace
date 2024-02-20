// "use client";
import { RepositoryCardLike } from "./RepositoryCardLike";
import { RepositoryCardLicense } from "./RepositoryCardLicense";
import { RepositoryCardStars } from "./RepositoryCardStars";
import { RepositoryCardLanguage } from "./RepositoryCardLanguage";
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
    <div className="flex justify-between space-x-4 text-xs text-[#848D97]">
      <div className="flex space-x-4">
        <RepositoryCardLanguage repository={repository} />
        <RepositoryCardStars
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
        <RepositoryCardLicense repository={repository} />
      </div>
      <RepositoryCardLike user={user} repository={repository} likes={likes} />
    </div>
  );
};
