"use server";

import { userAction } from "@/config/lib/next-safe-action";
import repositoryService from "@/services/repository.service";
import * as z from "zod";

const schema = z.object({
  url: z.string().url(),
  description: z.string(),
});

export const postRepositoryAction = userAction(schema, async (data, ctx) => {
  try {
    await repositoryService.postRepository({
      url: data.url,
      description: data.description,
      createdBy: ctx.session?.user.id,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
});
