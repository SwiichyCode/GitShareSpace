import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type LanguageType, languageTypeSchema } from "./types";
import { User } from "@prisma/client";
import { Repository } from "@/types/prisma.type";

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

export function formatLanguageToLowerCase(string: string): LanguageType {
  const lowerCaseString = string.toLowerCase();
  const validatedString = languageTypeSchema.parse(lowerCaseString);

  return validatedString;
}

export function handleColorByLanguage(language: LanguageType) {
  switch (language) {
    case "javascript":
      return "#F1E05A";
    case "typescript":
      return "#3178C6";
    case "html":
      return "#E34C26";

    default:
      return "bg-gray-500";
  }
}

export function getRepositoryAlreadyStarred(
  repositories: Repository[],
  user: User | null,
) {
  const repositoriesFromDatabase = repositories.map(
    (repository) => repository.url,
  );
  const repositoriesFromUser = user?.repositoryAlreadyStarred.map(
    (repository) => repository,
  );
  const alreadyStarred = repositoriesFromUser?.filter(
    (repositoryAlreadyStarred) =>
      repositoriesFromDatabase.includes(repositoryAlreadyStarred),
  );

  return alreadyStarred;
}
