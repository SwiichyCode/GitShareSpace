import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import type { User } from "@/types/prisma.type";
import type { Repository } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

type Props = {
  user: User | null;
  likes: Like[];
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCard = ({
  user,
  likes,
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-default p-2 shadow">
      <RepositoryCardHeader user={user} repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardFooter
          user={user}
          likes={likes}
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
      </div>
    </div>
  );
};
