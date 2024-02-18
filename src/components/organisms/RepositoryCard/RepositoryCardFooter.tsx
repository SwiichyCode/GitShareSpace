import { Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
  repositoriesAlreadyStarred?: string[];
};

export const RepositoryCardFooter = ({
  repository,
  repositoriesAlreadyStarred,
}: Props) => {
  const handleAlreadyStarredColor = (repository: Repository) => {
    if (repositoriesAlreadyStarred) {
      return repositoriesAlreadyStarred.map((r) => {
        if (r === repository.url) return "text-[#E3B341]";
      });
    }
  };

  return (
    <div className="flex justify-between space-x-4 text-xs text-[#848D97]">
      <div className="flex space-x-4">
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
          <Star
            className={cn("h-4 w-4", handleAlreadyStarredColor(repository))}
          />
          <span>{repository.repositoryStargazers}</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <button>
          <Heart className="h-4 w-4 hover:cursor-pointer hover:text-[#FF3E6C]" />
        </button>
      </div>
    </div>
  );
};
