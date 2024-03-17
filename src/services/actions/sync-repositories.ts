"use server";
import repositoryService from "@/services/repository.service";

export const syncRepositoriesAction = async () => {
  await repositoryService.updatedSyncRepositories();
};
