"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  PersonIcon,
  RepoIcon,
  StarIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";
import { Separator } from "@/components/atoms/separator";
import { useShareRepositoryModal } from "@/stores/useShareRepositoryModal";
import { useSidebar } from "@/stores/useSidebar";
import { AdminWrapper } from "@/components/organisms/AdminWrapper";
import { SidebarSyncRepositories } from "./SidebarSyncRepositories";
import { URL } from "@/constants";
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
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <PersonIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Your Profile</span>
      </Link>

      <button
        onClick={handleRepositoryModal}
        className="flex w-full items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <RepoIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Share repository</span>
      </button>
      <Separator />
      <Link
        href={URL.STARS}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <StarIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      {session?.user && (
        <AdminWrapper user={session.user}>
          <SidebarSyncRepositories />
        </AdminWrapper>
      )}
      <button
        className="flex min-h-7 w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
        onClick={() => signOut()}
      >
        <ArrowLeftIcon className="h-4 w-4 text-subtle" />
        <span className="text-sm">Sign out</span>
      </button>
    </nav>
  );
};
