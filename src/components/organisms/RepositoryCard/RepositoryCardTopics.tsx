import { Badge } from "@/components/atoms/badge";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
  visibleTopics?: number;
};

export const RepositoryCardTopics = ({
  repository,
  visibleTopics = 3,
}: Props) => {
  return (
    <div className="flex h-[22px] gap-2 text-link">
      {repository.topics.slice(0, visibleTopics).map((topic) => (
        <Badge key={topic.id} className="truncate ">
          {topic.name}
        </Badge>
      ))}
      {repository.topics.length > visibleTopics && <Badge>...</Badge>}
    </div>
  );
};
