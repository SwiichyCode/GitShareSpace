"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import { dataSharingAgreementSchema } from "@/components/organisms/_forms/dataSharingAgreement.schema";
import userService from "@/services/user.service";

export const updateAgreement = userAction(
  dataSharingAgreementSchema,
  async (data, ctx) => {
    try {
      await userService.updateAgreement(ctx.session.user, data.agreement!);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath("/");
  },
);
