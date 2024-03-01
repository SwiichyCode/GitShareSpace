import { forwardRef } from "react";
import { Badge } from "@/components/atoms/badge";
import type { Repository } from "@/types/prisma.type";

type Props = {
  repository: Repository;
};

const RepositoryCardTopics = forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { repository } = props;
    const visibleTopics = 3;

    return (
      <div className="text-link flex gap-2">
        {repository.topics.slice(0, visibleTopics).map((topic) => (
          <Badge
            key={topic.id}
            className="text-link max-w-full truncate bg-[#121D2F]"
          >
            {topic.name}
          </Badge>
        ))}
        ...
      </div>
    );
  },
);

RepositoryCardTopics.displayName = "RepositoryCardTopics";

export { RepositoryCardTopics };
