"use server";

import { adminAction } from "@/config/lib/next-safe-action";
import adminService from "@/services/admin.service";
import * as z from "zod";

const schema = z.object({
  userId: z.string(),
});

export const updateUserRoleAction = adminAction(schema, async (data) => {
  await adminService.updateUserRole(data);
});
