type UserEntry = {
  userId: string;
};

type QueryType<T> = object & T;

export type RemoveStarredRepositoriesType = QueryType<object>;
export type UpdateUserRoleType = QueryType<object>;
export type RemoveRepositoryCommentsType = QueryType<{
  repositoryId: number;
}>;

export type { UserEntry };
