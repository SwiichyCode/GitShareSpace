"use server";

import adminService from "@/services/admin.service";

export const refreshAgreementAction = async () => {
  return await adminService.refreshAgreement();
};
