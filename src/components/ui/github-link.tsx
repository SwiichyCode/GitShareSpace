import Link from "next/link";
import { MarkGithubIcon } from "@primer/octicons-react";

type Props = {
  url: string;
};

export const GithubLink = ({ url }: Props) => {
  return (
    <Link href={url} target="_blank">
      <MarkGithubIcon className="h-6 w-6" />
    </Link>
  );
};
