import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import type { User } from "@/types/prisma.type";
import type { Repository } from "@/types/prisma.type";

type Props = {
  user: User | null;
  repository: Repository;
};

export const RepositoryCard = ({ user, repository }: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-default p-2 shadow">
      <RepositoryCardHeader user={user} repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardFooter user={user} repository={repository} />
      </div>
    </div>
  );
};
