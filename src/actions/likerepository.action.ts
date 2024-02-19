"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import likeService from "@/services/like.service";
import * as z from "zod";

const likeRepositorySchema = z.object({
  repositoryId: z.number(),
});

export const likeRepository = userAction(
  likeRepositorySchema,
  async (data, ctx) => {
    try {
      await likeService.likeRepository(ctx.userId!, data.repositoryId);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);

export const unlikeRepository = userAction(
  likeRepositorySchema,
  async (data, ctx) => {
    try {
      await likeService.unlikeRepository(ctx.userId!, data.repositoryId);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);
