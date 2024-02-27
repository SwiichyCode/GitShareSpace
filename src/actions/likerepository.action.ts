"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import likeService from "@/services/like.service";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
});

export const likeOrUnlikeRepository = userAction(schema, async (data, ctx) => {
  try {
    const hasLiked = await likeService.hasLikedRepository(
      ctx.session.user.id,
      data.repositoryId,
    );

    if (hasLiked) {
      await likeService.unlikeRepository(
        ctx.session.user.id,
        data.repositoryId,
      );
    } else {
      await likeService.likeRepository(ctx.session.user.id, data.repositoryId);
    }
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/");
});
