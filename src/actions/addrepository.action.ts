"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import { formRepositorySchema } from "@/components/organisms/_forms/addrepository.schema";
import repositoryService from "@/services/repository.service";

export const addRepository = userAction(
  formRepositorySchema,
  async (data, ctx) => {
    try {
      await repositoryService.postRepository({
        ...data,
        createdBy: ctx.session.user.id,
      });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);
