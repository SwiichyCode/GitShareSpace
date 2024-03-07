"use server";
import userService from "@/services/user.service";

export const getUser = async (userId: string) => {
  return await userService.getUser(userId);
};
