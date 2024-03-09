"use server";

import { adminAction } from "@/config/lib/next-safe-action";
import adminService from "../admin.service";
import * as z from "zod";

const schema = z.object({
  repositoryId: z.coerce.number(),
});

export const removeRepositoryCommentsAction = adminAction(
  schema,
  async (data) => {
    return adminService.removeRepositoryComments(data);
  },
);
