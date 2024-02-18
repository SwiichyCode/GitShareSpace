import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCard = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-default p-2 shadow">
      <RepositoryCardHeader repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardFooter
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
      </div>
    </div>
  );
};
