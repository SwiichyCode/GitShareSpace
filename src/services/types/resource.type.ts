type PostResourceType = {
  url: string;
  description?: string;
  type: string;
  userId: string;
};

type GetResourceByFilterType = {
  queryParams?: string;
  typeParams?: string;
  params?: string;
  offset?: number;
  limit?: number;
  cursor?: number;
};

export type { GetResourceByFilterType, PostResourceType };
