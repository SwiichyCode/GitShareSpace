import { Skeleton } from "@/components/ui/skeleton";

export const RepositoryCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between space-y-4 overflow-hidden rounded-md border border-card bg-overlay p-2 shadow">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <Skeleton className="h-24 w-full" />
    </div>
  );
};
