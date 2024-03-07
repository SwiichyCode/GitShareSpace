import { RepositoryCardLayout } from "./_layout";
import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardTopics } from "./RepositoryCardTopics";
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
    <RepositoryCardLayout>
      <RepositoryCardHeader repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardTopics repository={repository} />
        <RepositoryCardFooter
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
      </div>
    </RepositoryCardLayout>
  );
};
