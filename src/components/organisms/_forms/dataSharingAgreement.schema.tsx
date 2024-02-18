import * as z from "zod";

export const dataSharingAgreementSchema = z.object({
  agreement: z.boolean().default(false).optional(),
});
