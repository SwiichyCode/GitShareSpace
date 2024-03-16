import { useInfiniteQuery } from "@tanstack/react-query";
import { getResourceByFilterAction } from "@/services/actions/get-resource-by-filter";

type Props = {
  queryParams: string;
  typeParams?: string;
  params: string;
};

export const useFetchResourceRepositories = ({
  queryParams,
  typeParams,
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
    queryKey: ["resources", { queryParams, typeParams, params }],
    queryFn: ({ pageParam }) =>
      getResourceByFilterAction({
        cursor: pageParam,
        queryParams,
        typeParams,
        params,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor,
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
