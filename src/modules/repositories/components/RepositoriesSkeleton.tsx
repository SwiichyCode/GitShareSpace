import { RepositoryCardSkeleton } from "./RepositoryCard/RepositoryCardSkeleton";

export const RepositoriesSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <RepositoryCardSkeleton key={index} />
      ))}
    </div>
  );
};
