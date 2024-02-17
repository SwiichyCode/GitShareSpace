import repositoryService from "@/services/repository.service";
import { ProfileAvatar } from "../molecules/Avatar";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  cn,
  formatLanguageToLowerCase,
  handleColorByLanguage,
} from "@/lib/utils";

export const RepositoryGrid = async () => {
  const repositories = await repositoryService.getRepositories();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {repositories.map((repository) => (
        <div
          key={repository.id}
          className="border-card overflow-hidden rounded-md border bg-default p-2 shadow"
        >
          <div className="flex items-center gap-2">
            <ProfileAvatar
              pictureUrl={`${repository.ownerAvatarUrl}?size=40`}
              alt={repository.ownerUsername}
            />
            <div className="flex flex-col">
              <Link
                href={repository.url}
                className="w-48 truncate text-sm font-semibold hover:text-[#2F81F7] hover:underline"
                target="_blank"
              >
                {repository.ownerUsername}/{repository.repositoryName}
              </Link>
              <span className="text-xs">
                Published by {repository.createdBy.name}
              </span>
            </div>
          </div>

          {/* Footer Card */}
          <div className="flex space-x-4 text-xs text-[#848D97]">
            <div className="flex items-center space-x-1">
              {/* <div
                className={cn("h-3 w-3 rounded-full")}
                style={{
                  backgroundColor: handleColorByLanguage(
                    formatLanguageToLowerCase(repository.language.name),
                  ),
                }}
              /> */}
              <span>{repository.language.name}</span>
            </div>
            <div className="flex space-x-1">
              <Star className="h-4 w-4" />
              <span>{repository.repositoryStargazers}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
