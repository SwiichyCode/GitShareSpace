import Link from "next/link";
import { MarkGithubIcon } from "@primer/octicons-react";
import { URL } from "@/constants";

export const GithubLink = () => {
  return (
    <Link href={URL.REPO}>
      <MarkGithubIcon className="h-6 w-6" />
    </Link>
  );
};
