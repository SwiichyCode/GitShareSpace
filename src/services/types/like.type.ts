type LikeEntry = {
  userId: string;
  repositoryId: number;
};

type QueryType<T> = {
  userId: string;
  repositoryId: number;
} & T;

export type LikeRepositoryType = QueryType<{
  repositorySharedBy: string;
  score: number;
}>;
export type UnlikeRepositoryType = QueryType<object>;
export type HasLikedRepositoryType = QueryType<object>;

export type { LikeEntry };
