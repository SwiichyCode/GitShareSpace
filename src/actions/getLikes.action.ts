"use server";

import likeService from "@/services/like.service";
import { cache } from "react";

export const getLikes = cache(async () => {
  return await likeService.getLikes();
});
