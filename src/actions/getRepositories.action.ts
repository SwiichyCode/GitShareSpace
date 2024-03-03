"use server";
import repositoryService from "@/services/repository.service";

type Props = {
  query?: string;
  offset?: number;
  limit?: number;
  cursor?: number;
};

export const getRepositoriesOnScroll = async ({
  query,
  offset = 0,
  limit = 20,
  cursor,
}: Props) => {
  return await repositoryService.getRepositoriesOnScroll({
    query,
    offset,
    limit,
    cursor,
  });
};

export const getRepositories = async () => {
  return await repositoryService.getRepositories();
};
