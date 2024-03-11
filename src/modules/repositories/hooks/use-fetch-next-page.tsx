import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

type Props = {
  action: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any>, Error>>;
  hasNextPage: boolean;
};

export const useFetchNextPage = ({ action, hasNextPage }: Props) => {
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      void action();
    }
  }, [inView, hasNextPage, action]);

  return { ref, inView };
};
