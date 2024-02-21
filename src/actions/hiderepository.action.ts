"use server";
import { revalidatePath } from "next/cache";
import { adminAction } from "@/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import * as z from "zod";

const hideRepositorySchema = z.object({
  id: z.number(),
});

export const hideRepository = adminAction(
  hideRepositorySchema,
  async (data) => {
    try {
      await repositoryService.hideRepository(data.id);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);
