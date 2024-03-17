import { Skeleton } from "@/components/ui/skeleton";
import { RepositoryCardSkeleton } from "@/modules/repositories/components/RepositoryCard/RepositoryCardSkeleton";

export default function Loading() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-8">
      <Skeleton className="flex h-[74px] w-[410px] space-x-4 rounded-md border border-card bg-background" />

      <div className="flex w-full flex-col gap-8">
        {Array.from({ length: 15 }).map((_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
