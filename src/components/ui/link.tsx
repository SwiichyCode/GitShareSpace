import Link, { type LinkProps } from "next/link";
import type { LinkHTMLAttributes } from "react";

interface CustomLinkProps extends LinkHTMLAttributes<LinkProps> {}

export const CustomLink = (props: CustomLinkProps) => {
  return (
    <Link href={props.href!} className="hover:text-blue hover:underline">
      {props.children}
    </Link>
  );
};
