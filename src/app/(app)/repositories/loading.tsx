import { RepositoryCardSkeleton } from "@/modules/repositories/components/RepositoryCard/RepositoryCardSkeleton";

export default function loading() {
  return (
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <RepositoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
