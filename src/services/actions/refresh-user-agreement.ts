"use server";

import { adminAction } from "@/config/lib/next-safe-action";
import adminService from "@/services/admin.service";
import * as z from "zod";

const schema = z.object({
  userId: z.string(),
});

export const refreshUserAgreementAction = adminAction(schema, async (data) => {
  return await adminService.refreshUserAgreement({ userId: data.userId });
});
