"use server";
import adminService from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export const refreshAgreement = async () => {
  try {
    await adminService.refreshAgreement();
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/");
};
