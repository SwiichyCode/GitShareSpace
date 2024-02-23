"use client";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getRepositoriesOnScroll } from "@/actions/getRepositories.action";
import type { Repository } from "@/types/prisma.type";

type Props = {
  initialRepositories: Repository[];
  search: string;
  limit: number;
};

export const useInfiniteScroll = ({
  initialRepositories,
  search,
  limit,
}: Props) => {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isDisable, setDisable] = useState(false);

  const loadMoreRepositories = useCallback(async () => {
    const next = page + 1;
    const offset = next * limit;

    const { data: newRepositories } = await getRepositoriesOnScroll({
      search,
      limit: 20,
      offset,
      cursor: repositories[repositories.length - 1]!.id,
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
  }, [page, limit, search, repositories]);

  useEffect(() => {
    let isSubscribed = true;

    if (inView && isSubscribed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadMoreRepositories();
    }

    return () => {
      isSubscribed = false;
    };
  }, [inView, loadMoreRepositories]);

  return { repositories, ref, isDisable };
};
