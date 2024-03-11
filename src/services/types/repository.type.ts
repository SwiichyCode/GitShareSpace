type RepositoryEntry = {
  repositoryId: number;
};

type PostRepositoryType = {
  url: string;
  description: string;
  createdBy: string;
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
