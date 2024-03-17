type RepositoryEntry = {
  repositoryId: number;
};

type PostRepositoryType = {
  url: string;
  description: string;
  createdBy: string;

  userId: string;
  score: number;
};

type GetRepositoriesByFilterType = {
  queryParams?: string;
  languageParams?: string;
  params?: string;
  offset?: number;
  limit?: number;
  cursor?: number;
};

type UpdateRepositoryAlreadyStarredType = {
  userId: string;
  repositoryId: number[];
};

type PostRepositoryCommentType = {
  repositoryId: number;
  content: string;
  createdBy: string;
  score: number;
};

type HasStarredRepositoryType = {
  userId: string;
  repositoryId: number;
};

export type {
  GetRepositoriesByFilterType,
  UpdateRepositoryAlreadyStarredType,
  PostRepositoryType,
  PostRepositoryCommentType,
  HasStarredRepositoryType,
  RepositoryEntry,
};
