"use server";
import { action } from "@/config/lib/next-safe-action";
import resourceService from "../resource.service";
import * as z from "zod";

const schema = z.object({
  queryParams: z.string().optional(),
  typeParams: z.string().optional(),
  params: z.string().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  cursor: z.coerce.number().optional(),
});

export const getResourceByFilterAction = action(schema, async (data) => {
  return await resourceService.getResourcesByFilter(data);
});
