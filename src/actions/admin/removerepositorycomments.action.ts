"use server";

import { adminAction } from "@/lib/next-safe-action";
import adminService from "@/services/admin.service";
import { revalidatePath } from "next/cache";
import { URL } from "@/constants";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.number(),
});

export const removeRepositoryComments = adminAction(schema, async (data) => {
  try {
    await adminService.removeRepositoryComments(data.repositoryId);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(`${URL.REPOSITORIES}/${data.repositoryId}`);
});
