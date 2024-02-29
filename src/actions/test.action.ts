"use server";

import { db } from "@/server/db";

export const getRepositories = async () => {
  return await db.repository.findMany();
};
