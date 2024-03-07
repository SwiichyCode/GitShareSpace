"use server";

import { userAction } from "@/lib/next-safe-action";
import repositoryService from "@/services/repository.service";

import * as z from "zod";

const schema = z.object({
  url: z.string().url(),
  description: z.string(),
});

export const addRepository = userAction(schema, async (data, ctx) => {
  try {
    await repositoryService.postRepository({
      ...data,
      createdBy: ctx.session.user.id,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
});
