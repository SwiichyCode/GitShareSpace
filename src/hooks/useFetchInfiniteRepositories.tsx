import { useInfiniteQuery } from "@tanstack/react-query";
import { getRepositoriesByFilter } from "@/services/actions/repository.service";

type Props = {
  queryParams: string;
  languageParams: string;
};

export const useFetchInfiniteRepositories = ({
  queryParams,
  languageParams,
}: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["repositories", { queryParams, languageParams }],
    queryFn: ({ pageParam }) =>
      getRepositoriesByFilter({
        cursor: pageParam,
        queryParams,
        languageParams,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  };
};
