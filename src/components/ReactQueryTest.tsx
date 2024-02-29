"use client";
import { useQuery } from "@tanstack/react-query";
import { Repository } from "@prisma/client";
import { getRepositories } from "@/actions/test.action";

type Props = {
  repositories: Repository[];
};

export const Test = ({ repositories }: Props) => {
  const { data, error, isFetched } = useQuery({
    queryKey: ["repositories"],
    queryFn: () => getRepositories(),
    initialData: repositories,
    notifyOnChangeProps: ["data", "error"],
    refetchOnMount: false,
    staleTime: Infinity,
  });

  return (
    <div>
      {repositories.map((repository) => (
        <p key={repository.id}>{repository.url}</p>
      ))}
    </div>
  );
};
