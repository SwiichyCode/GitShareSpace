"use server";

import { userAction } from "@/config/lib/next-safe-action";
import userService from "../user.service";
import { revalidatePath } from "next/cache";
import { URL } from "@/config/constants";
import * as z from "zod";

const schema = z.object({});

export const resetPersonalAccessTokenAction = userAction(
  schema,
  async (data, ctx) => {
    await userService.resetPersonalAccessToken({ userId: ctx.session.user.id });

    revalidatePath(URL.SETTINGS);
  },
);
