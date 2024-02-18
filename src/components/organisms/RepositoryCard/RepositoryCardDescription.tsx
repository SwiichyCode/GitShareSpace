import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardDescription = ({ repository }: Props) => {
  return (
    <p className="w-full truncate text-sm">
      {repository.repositoryDescription ?? "No description provided"}
    </p>
  );
};
