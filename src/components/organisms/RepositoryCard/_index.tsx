import { RepositoryCardLayout } from "./_layout";
import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardTopics } from "./RepositoryCardTopics";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import type { User } from "@/types/prisma.type";
import type { Repository } from "@/types/prisma.type";

type Props = {
  user: User | null;
  repository: Repository;
};

export const RepositoryCard = ({ user, repository }: Props) => {
  return (
    <RepositoryCardLayout>
      <RepositoryCardHeader user={user} repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardTopics repository={repository} />
        <RepositoryCardFooter user={user} repository={repository} />
      </div>
    </RepositoryCardLayout>
  );
};
