"use client";
import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { useSidebar } from "./useSidebar";

interface SidebarNavigationLinkProps extends PropsWithChildren<LinkProps> {}

export const SidebarNavigationLink = ({
  children,
  ...props
}: SidebarNavigationLinkProps) => {
  const { toggle } = useSidebar();

  return (
    <Link
      className="flex w-full items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
      onClick={() => toggle()}
      {...props}
    >
      {children}
    </Link>
  );
};
