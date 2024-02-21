"use server";
import { revalidatePath } from "next/cache";
import repositoryService from "@/services/repository.service";

export const syncRepositories = async () => {
  try {
    await repositoryService.syncRepositories();
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/");
};
