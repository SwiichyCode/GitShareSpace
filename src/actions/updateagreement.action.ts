"use server";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/next-safe-action";
import userService from "@/services/user.service";
import * as z from "zod";

const schema = z.object({
  agreement: z.boolean().default(false).optional(),
});

export const updateAgreement = userAction(schema, async (data, ctx) => {
  try {
    await userService.updateAgreement(ctx.session.user, data.agreement!);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/");
});
