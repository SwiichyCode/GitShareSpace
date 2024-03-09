"use client";

import Link from "next/link";
import { PersonIcon, RepoIcon, StarIcon } from "@primer/octicons-react";
import { Separator } from "@/components/ui/separator";
import { useShareRepositoryModal } from "@/modules/repositories/stores/useShareRepositoryModal";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";
import { SidebarSignout } from "./SidebarSignout";
import { SidebarAdministration } from "./SidebarAdministration";
import { URL } from "@/config/constants";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const SidebarNavigation = ({ session }: Props) => {
  const { open: openRepositoryModal, setOpen: setOpenRepositoryModal } =
    useShareRepositoryModal();
  const { open: openSidebar, setOpen: setOpenSidebar } = useSidebar();

  const handleRepositoryModal = () => {
    setOpenRepositoryModal(!openRepositoryModal);
    setOpenSidebar(!openSidebar);
  };

  return (
    <nav className="space-y-2">
      <Link
        href={URL.PROFILE}
        className="hover:bg-subtle-hover flex items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <PersonIcon className="text-subtle h-4 w-4" />
        <span className="text-sm">Your Profile</span>
      </Link>

      <button
        onClick={handleRepositoryModal}
        className="hover:bg-subtle-hover flex w-full items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <RepoIcon className="text-subtle h-4 w-4" />
        <span className="text-sm">Share repository</span>
      </button>
      <Separator />
      <Link
        href={URL.STARS}
        className="hover:bg-subtle-hover flex items-center space-x-2 rounded-md px-2 py-1 transition"
      >
        <StarIcon className="text-subtle h-4 w-4" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      <SidebarAdministration session={session} />
      <SidebarSignout />
    </nav>
  );
};
