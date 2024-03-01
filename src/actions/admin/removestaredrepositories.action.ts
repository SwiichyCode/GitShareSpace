"use server";

import { adminAction } from "@/lib/next-safe-action";
import adminService from "@/services/admin.service";
import { revalidatePath } from "next/cache";
import { URL } from "@/constants";
import * as z from "zod";

const schema = z.object({
  userId: z.string(),
});

export const removeStaredRepositories = adminAction(schema, async (data) => {
  try {
    await adminService.removeRepositoryAlreadyStarred(data.userId);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(URL.REPOSITORIES);
});
