import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

export const RepositoryCardDescription = ({ repository }: Props) => {
  return (
    <>
      <p className="w-full truncate text-sm">
        <span>Github descriptionn:</span>{" "}
        {repository.repositoryDescription ?? "No description provided"}
      </p>
      <p className="w-full truncate text-sm">
        <span>Publisher description:</span> {repository.description}
      </p>
    </>
  );
};
