import type { Repository, User } from "@/types/prisma.type";
import { getRepositoriesAlreadyStarred } from "./getRepositoriesAlreadyStarred";
import { getRepositoriesAlreadyLiked } from "./getRepositoriesAlreadyLiked";

type Props = {
  query: string;
  language: string;
  initialRepositories: Repository[];
  repositories: Repository[];
  user: User | null;
  toggleFilter: "starred" | "liked" | "all";
};
type FilterFunction = (
  repositories: Repository[],
  user: User | null,
) => Repository[];

type FilterFunctions = Record<string, FilterFunction | undefined>;

const filterFunctions: FilterFunctions = {
  starred: getRepositoriesAlreadyStarred,
  liked: getRepositoriesAlreadyLiked,
};

export const getFilteredRepositories = ({
  query,
  language,
  initialRepositories,
  repositories,
  user,
  toggleFilter,
}: Props) => {
  let filteredRepositories =
    query || language ? initialRepositories : repositories;

  const filterFunction = filterFunctions[toggleFilter];

  if (filterFunction) {
    filteredRepositories = filterFunction(repositories, user);
  }

  if (language) {
    filteredRepositories = filteredRepositories.filter(
      (repository) => repository.language.name === language,
    );
  }

  return filteredRepositories;
};
