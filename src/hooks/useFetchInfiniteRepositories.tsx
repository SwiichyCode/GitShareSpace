import { useInfiniteQuery } from "@tanstack/react-query";
import { getRepositoriesByFilter } from "@/services/repository.service";

type Props = {
  queryParams: string;
  languageParams: string;
  params: string;
};

export const useFetchInfiniteRepositories = ({
  queryParams,
  languageParams,
  params,
}: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["repositories", { queryParams, languageParams, params }],
    queryFn: ({ pageParam }) =>
      getRepositoriesByFilter({
        cursor: pageParam,
        queryParams,
        languageParams,
        params,
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
