import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";

type Props = {
  query: string;
  language: string;
};

export const useFetchInfiniteRepositories = ({ query, language }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSuspenseInfiniteQuery({
      queryKey: ["repositories", { query, language }],
      queryFn: ({ pageParam }) =>
        getRepositoriesOnScroll({ cursor: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};
