"use client";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getRepositoriesOnScroll } from "@/actions/test.action";
import { getRepositoryAlreadyStarredURL } from "@/utils/getRepositoryAlreadyStarredURL";
import type { Repository, User } from "@/types/prisma.type";

type Props = {
  initialRepositories: Repository[];
  limit: number;
  user: User | null;
};

export const useInfiniteScroll = ({
  initialRepositories,
  limit,
  user,
}: Props) => {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [page, setPage] = useState(1);

  const [ref, inView] = useInView({
    rootMargin: "200px",
  });

  const [isDisabled, setDisabled] = useState(false);

  const fetchMoreRepositories = useCallback(async () => {
    const next = page + 1;
    const offset = next * limit;

    const { data } = await getRepositoriesOnScroll({
      limit,
      offset,
      cursor: repositories.length && repositories[repositories.length - 1]!.id,
    });

    if (data.length) {
      setPage(next);
      setRepositories((prev: Repository[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...data,
      ]);
    } else {
      setDisabled(true);
    }
  }, [page, limit, repositories]);

  const repositoriesAlreadyStarred = getRepositoryAlreadyStarredURL(
    repositories,
    user,
  );

  useEffect(() => {
    if (inView) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchMoreRepositories();
    }
  }, [inView, fetchMoreRepositories]);

  return { repositories, repositoriesAlreadyStarred, ref, isDisabled };
};
