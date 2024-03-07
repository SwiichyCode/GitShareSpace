"use client";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { getRepositoriesByFilter } from "@/services/repository.service";
import { URL } from "@/constants";

export const PrefetchLink = () => {
  const queryClient = useQueryClient();

  const prefetchRepositories = () => {
    queryClient
      .prefetchInfiniteQuery({
        queryKey: [
          "repositories",
          { queryParams: "", languageParams: "", params: "" },
        ],
        queryFn: ({ pageParam }) =>
          getRepositoriesByFilter({ cursor: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
        pages: 1,
        staleTime: 1000 * 60 * 5,
      })
      .catch(console.error);
  };

  return (
    <Link
      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      href={URL.REPOSITORIES}
      onMouseEnter={prefetchRepositories}
    >
      Get started
    </Link>
  );
};