"use server";
import repositoryService from "@/services/repository.service";
import { revalidatePath } from "next/cache";

type Props = {
  query?: string;
  language?: string;
  offset?: number;
  limit?: number;
  cursor?: number;
};

export const getRepositoriesOnScroll = async ({
  query,
  language,
  offset = 0,
  limit = 20,
  cursor,
}: Props) => {
  return await repositoryService.getRepositoriesOnScroll({
    query,
    language,
    offset,
    limit,
    cursor,
  });
};

export const getRepositories = async () => {
  return await repositoryService.getRepositories();
};
