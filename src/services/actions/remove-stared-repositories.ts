"use server";
import { revalidatePath } from "next/cache";
import { adminAction } from "@/config/lib/next-safe-action";
import adminService from "@/services/admin.service";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({
  userId: z.string(),
});

export const removeStarredRepositoriesAction = adminAction(
  schema,
  async (data) => {
    await adminService.removeStarredRepositories(data);

    revalidatePath(URL.REPOSITORIES);
  },
);
