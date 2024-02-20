import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type LanguageType, languageTypeSchema } from "./types";
import type { User } from "@/types/prisma.type";
import type { Repository } from "@/types/prisma.type";
import type { Like } from "@prisma/client";

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

export const handleColorByLike = (
  user: User | null,
  repository: Repository,
  optimisticLikes: Like[],
) => {
  const liked = user?.likes.concat(optimisticLikes).find((like) => {
    return like.repositoryId === repository.id && like.userId === user?.id;
  });

  return liked ? "text-[#FF3E6C]" : "";
};

export const handleLikeCount = (likes: Like[], repository: Repository) => {
  const liked = likes.map((like) => {
    if (like.repositoryId === repository.id) {
      return like;
    }
  });

  const filterLiked = liked.filter((like) => like !== undefined);

  return filterLiked.length;
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return formattedNum.endsWith(".0")
      ? formattedNum.slice(0, -2) + "m"
      : formattedNum + "m";
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return formattedNum.endsWith(".0")
      ? formattedNum.slice(0, -2) + "k"
      : formattedNum + "k";
  } else {
    return num;
  }
};
