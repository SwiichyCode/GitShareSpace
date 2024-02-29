"use server";
import repositoryService from "@/services/repository.service";
import { cache } from "react";

export const getRepositoriesOnScroll = cache(
  async ({
    query,
    offset = 0,
    limit = 20,
    cursor,
  }: {
    query?: string | undefined;
    offset?: number;
    limit?: number;
    cursor?: number;
  }) => {
    return await repositoryService.getRepositoriesOnScroll({
      query,
      offset,
      limit,
      cursor,
    });
  },
);
