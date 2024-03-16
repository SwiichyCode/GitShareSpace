import { LogIcon } from "@primer/octicons-react";

type Props = {
  description: string | null;
};

export const ResourceCardDescription = ({ description }: Props) => {
  if (!description) return null;

  return (
    <div className="flex items-center gap-2">
      <LogIcon className="h-4 w-4" />
      <p className="text-sm">{description}</p>
    </div>
  );
};
