import Link from "next/link";
import React from "react";
import { LinkIcon } from "@primer/octicons-react";

type Props = {
  url: string;
};

export const ResourceCardUrl = ({ url }: Props) => {
  return (
    <div className="flex items-center gap-2 hover:text-blue hover:underline">
      <LinkIcon className="h-4 w-4" />
      <Link className="truncate text-sm " href={url} target="_blank">
        {url}
      </Link>
    </div>
  );
};
