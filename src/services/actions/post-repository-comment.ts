"use server";

import { userAction } from "@/config/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.coerce.number(),
  content: z.string(),
});

export const postRepositoryCommentAction = userAction(
  schema,
  async (data, ctx) => {
    await repositoryService.postRepositoryComment({
      repositoryId: data.repositoryId,
      content: data.content,
      createdBy: ctx.session?.user?.id,
    });

    revalidatePath(`/repositories/${data.repositoryId}`);
  },
);
