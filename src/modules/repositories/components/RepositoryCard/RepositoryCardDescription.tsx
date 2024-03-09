import { removeUnsupportedEmojis } from "@/modules/repositories/utils/removeUnsupportedEmojis";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/ui/editor";
import type { Repository } from "@/config/types/prisma.type";

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
  const isEmpty = !text && "rounded-md bg-skeleton";

  return (
    <p
      className={cn("line-clamp-2 h-[40px] w-full text-sm", isEmpty, className)}
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
      <Editor
        key={"editor"}
        title="Publisher description"
        text={repository.description}
      />
    </>
  );
};
