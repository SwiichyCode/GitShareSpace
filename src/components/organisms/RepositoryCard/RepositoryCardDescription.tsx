import { removeUnsupportedEmojis } from "@/utils/removeUnsupportedEmojis";
import type { Repository } from "@/types/prisma.type";
import { cn } from "@/lib/utils";

type Props = {
  repository: Repository;
};

type DescriptionProps = {
  title: string;
  text: string | null;
  className?: string;
};

const Description = (props: DescriptionProps) => {
  const { title, text, className } = props;
  const isEmptyClass = !text && "rounded-md bg-[#0D1117]";

  return (
    <p
      className={cn(
        "line-clamp-2 h-[40px] w-full text-sm",
        isEmptyClass,
        className,
      )}
    >
      {text && (
        <>
          <span className="font-semibold">{title}:</span>{" "}
          {removeUnsupportedEmojis(text)}
        </>
      )}
    </p>
  );
};

export const RepositoryCardDescription = ({ repository }: Props) => {
  return (
    <>
      <Description
        title="Github description"
        text={repository.repositoryDescription}
      />
      <Description
        title="Publisher description"
        text={repository.description}
      />
    </>
  );
};
