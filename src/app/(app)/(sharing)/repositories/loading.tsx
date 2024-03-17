import { RepositoryCardSkeleton } from "@/modules/repositories/components/RepositoryCard/RepositoryCardSkeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 md:w-full md:grid-cols-2 md:place-items-stretch xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <RepositoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
