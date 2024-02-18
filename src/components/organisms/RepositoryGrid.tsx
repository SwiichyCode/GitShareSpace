import repositoryService from "@/services/repository.service";
import { RepositoryCard } from "@/components/organisms/RepositoryCard/_index";

export const RepositoryGrid = async () => {
  const repositories = await repositoryService.getRepositories();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {repositories.map((repository) => (
        <RepositoryCard repository={repository} key={repository.id} />
      ))}
    </div>
  );
};
