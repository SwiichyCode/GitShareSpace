import { SharingCard } from "@/components/layouts/SharingCard/_index";
import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardDescription } from "./RepositoryCardDescription";
import { RepositoryCardTopics } from "./RepositoryCardTopics";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: number[];
};

export const RepositoryCard = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  return (
    <SharingCard
      header={<RepositoryCardHeader repository={repository} />}
      body={
        <>
          <RepositoryCardDescription repository={repository} />
          <RepositoryCardTopics repository={repository} />
        </>
      }
      footer={
        <RepositoryCardFooter
          repository={repository}
          repositoriesAlreadyStarred={repositoriesAlreadyStarred}
        />
      }
    />
  );
};
