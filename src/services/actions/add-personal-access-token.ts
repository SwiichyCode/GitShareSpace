"use server";

import { URL } from "@/config/constants";
import { userAction } from "@/config/lib/next-safe-action";
import userService from "@/services/user.service";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const schema = z.object({
  personalAccessToken: z.string(),
});

export const addPersonalAccessTokenAction = userAction(
  schema,
  async (data, ctx) => {
    await userService.addPersonalAccessToken({
      userId: ctx.session.user.id,
      personalAccessToken: data.personalAccessToken,
    });

    revalidatePath(URL.SETTINGS);
  },
);
