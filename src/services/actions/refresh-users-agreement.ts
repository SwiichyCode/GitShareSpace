"use server";

import { adminAction } from "@/config/lib/next-safe-action";
import adminService from "@/services/admin.service";
import * as z from "zod";

const schema = z.object({});

export const refreshUsersAgreementAction = adminAction(schema, async () => {
  return await adminService.refreshUsersAgreement();
});
