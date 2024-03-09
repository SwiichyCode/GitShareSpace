"use client";

import Link from "next/link";
import { PersonIcon, RepoIcon, StarIcon } from "@primer/octicons-react";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { SidebarSignout } from "./SidebarSignout";
import { SidebarAdministration } from "./SidebarAdministration";
import { URL } from "@/config/constants";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const SidebarNavigation = ({ session }: Props) => {
  const { toggle } = useSidebar();

  return (
    <nav className="space-y-2">
      <Link
        href={URL.PROFILE}
        className="flex w-full items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
        onClick={() => toggle()}
      >
        <PersonIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Your Profile</span>
      </Link>

      <Link
        className="flex w-full items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
        href={URL.REPOSITORIES}
        onClick={() => toggle()}
      >
        <RepoIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Repositories</span>
      </Link>
      <Separator />
      <Link
        href={URL.STARS}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtle-hover"
      >
        <StarIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      <SidebarAdministration session={session} />
      <SidebarSignout />
    </nav>
  );
};
