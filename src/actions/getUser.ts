"use server";

import userService from "@/services/user.service";
import { cache } from "react";

export const getUser = cache(async (userId: string) => {
  return await userService.getUser(userId);
});
