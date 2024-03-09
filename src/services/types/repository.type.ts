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
  repositoryUrl: string[];
};

type PostRepositoryCommentType = {
  repositoryId: number;
  content: string;
  createdBy: string;
};

export type {
  GetRepositoriesByFilterType,
  UpdateRepositoryAlreadyStarredType,
  PostRepositoryType,
  PostRepositoryCommentType,
  RepositoryEntry,
};
