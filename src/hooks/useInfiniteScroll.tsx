"use client";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";
import type { Repository } from "@/types/prisma.type";

type Props = {
  initialRepositories: Repository[];
  query: string;
  limit: number;
};

export const useInfiniteScroll = ({
  initialRepositories,
  query,
  limit,
}: Props) => {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    rootMargin: "200px",
  });
  const [isDisable, setDisable] = useState(false);

  const loadMoreRepositories = useCallback(async () => {
    const next = page + 1;
    const offset = next * limit;

    const { data: newRepositories } = await getRepositoriesOnScroll({
      query,
      limit: 20,
      offset,
      cursor: repositories.length && repositories[repositories.length - 1]!.id,
    });

    if (newRepositories.length) {
      setPage(next);
      setRepositories((prev: Repository[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newRepositories,
      ]);
    } else {
      setDisable(true);
    }
  }, [page, limit, query, repositories]);

  useEffect(() => {
    let isSubscribed = true;

    if (inView && isSubscribed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadMoreRepositories();
    }

    return () => {
      isSubscribed = false;
    };
  }, [inView, loadMoreRepositories, query]);

  // If the search query changes, reset the list of repositories.
  useEffect(() => {
    setRepositories(initialRepositories);
    setPage(1);
    setDisable(false);
  }, [initialRepositories, query]);

  return { repositories, ref, isDisable };
};
