"use server";
import { revalidatePath } from "next/cache";
import { adminAction } from "@/lib/next-safe-action";
import adminService from "@/services/admin.service";
import { URL } from "@/constants";
import * as z from "zod";

const schema = z.object({
  userId: z.string(),
});

export const updateUserRole = adminAction(schema, async (data) => {
  try {
    await adminService.updateUserRole(data.userId);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(URL.REPOSITORIES);
});
