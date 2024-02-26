import * as z from "zod";

export const updateUserRoleSchema = z.object({
  userId: z.string(),
});
