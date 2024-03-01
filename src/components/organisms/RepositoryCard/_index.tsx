import { useRef } from "react";
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
  const repositoryCardRef = useRef<HTMLDivElement>(null);

  return (
    <RepositoryCardLayout ref={repositoryCardRef}>
      <RepositoryCardHeader user={user} repository={repository} />
      <div className="space-y-2 rounded-sm bg-overlay p-3">
        <RepositoryCardDescription repository={repository} />

        <RepositoryCardTopics repository={repository} ref={repositoryCardRef} />
        <RepositoryCardFooter user={user} repository={repository} />
      </div>
    </RepositoryCardLayout>
  );
};
