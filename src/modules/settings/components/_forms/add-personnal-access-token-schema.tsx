import * as z from "zod";

export const addPersonalAccessTokenSchema = z.object({
  personalAccessToken: z.string(),
});
