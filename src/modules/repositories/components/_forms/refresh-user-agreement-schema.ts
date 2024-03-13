import * as z from "zod";

export const refreshUserAgreementSchema = z.object({
  userId: z.string(),
});
