"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, PlusIcon, Star } from "lucide-react";
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
        <User className="h-5 w-5 text-subtle" />
        <span className="text-sm">Your Profile</span>
      </Link>

      <button
        onClick={handleRepositoryModal}
        className="flex w-full items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <PlusIcon className="h-5 w-5 text-subtle" />
        <span className="text-sm">Share repository</span>
      </button>
      <Separator />
      <Link
        href={URL.STARS}
        className="flex items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
      >
        <Star className="h-5 w-5 text-subtle" />
        <span className="text-sm">Your stars</span>
      </Link>
      <Separator />
      <AdminWrapper session={session}>
        <SidebarSyncRepositories />
      </AdminWrapper>
      <div
        className="flex min-h-7 cursor-pointer items-center space-x-2 rounded-md px-2 py-1 transition hover:bg-subtleHover"
        onClick={() => signOut()}
      >
        <span className="text-sm">Sign out</span>
      </div>
    </nav>
  );
};
