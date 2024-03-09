"use server";

import { adminAction } from "@/config/lib/next-safe-action";
import * as z from "zod";
import adminService from "../admin.service";

const schema = z.object({
  userId: z.string(),
});

export const removeStarredRepositoriesAction = adminAction(
  schema,
  async (data) => {
    await adminService.removeStarredRepositories(data);
  },
);
