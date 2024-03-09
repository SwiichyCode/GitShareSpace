import { useQueryClient } from "@tanstack/react-query";
import { getRepositoriesByFilterAction } from "@/services/actions/get-repositories-by-filter";

export const usePrefetchRepositories = () => {
  const queryClient = useQueryClient();

  const prefetchRepositories = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: [
        "repositories",
        { queryParams: "", languageParams: "", params: "" },
      ],
      queryFn: ({ pageParam }) =>
        getRepositoriesByFilterAction({ cursor: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
      pages: 1,
    });
  };

  return { prefetchRepositories };
};
