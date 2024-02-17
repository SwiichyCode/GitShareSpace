import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function add(a: number, b: number) {
  return a + b;
}

export function extractUserIdFromAvatarUrl(url: string) {
  const parts = url.split("/");
  const userIdWithQuery = parts[parts.length - 1];
  const userId = userIdWithQuery?.split("?")[0];
  return userId;
}
