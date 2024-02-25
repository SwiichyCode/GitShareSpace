"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
  content: z.string().min(1, "Comment must be at least 1 character long"),
});

export const addComment = userAction(schema, async (data, ctx) => {
  try {
    await repositoryService.addCommentToRepository(
      data.repositoryId,
      data.content,
      ctx.session.user.id,
    );
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(`/repositories/${data.repositoryId}`);
});
