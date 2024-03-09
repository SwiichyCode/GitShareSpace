import type { Repository } from "@/config/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardLanguage = ({ repository }: Props) => {
  return (
    repository.language.name && (
      <div className="flex items-center space-x-1">
        <span>{repository.language.name}</span>
      </div>
    )
  );
};
