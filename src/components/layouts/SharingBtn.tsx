"use client";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useShareRepositoryModal } from "@/modules/repositories/stores/useShareRepositoryModal";
import { useShareResourceModal } from "@/modules/resources/stores/useShareResourcesModal";
import { RepoIcon, FileDirectoryIcon } from "@primer/octicons-react";
import { AUTH_PROVIDER, URL } from "@/config/constants";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

type PageActions = {
  [URL.REPOSITORIES]: {
    action: (open: boolean) => void;
    label: string;
    icon: typeof RepoIcon;
  };
  [URL.RESOURCES]: {
    action: (open: boolean) => void;
    label: string;
    icon: typeof FileDirectoryIcon;
  };
};

function assertIsPageActionKey(key: string): key is keyof PageActions {
  return key === URL.REPOSITORIES || key === URL.RESOURCES;
}

export const SharingBtn = ({ session }: Props) => {
  const { setOpen: setOpenShareRepositoryModal } = useShareRepositoryModal();
  const { setOpen: setOpenShareResourceModal } = useShareResourceModal();
  const pathname = usePathname();

  const pageActions = {
    [URL.REPOSITORIES]: {
      action: setOpenShareRepositoryModal,
      label: "Share Repository",
      icon: RepoIcon,
    },
    [URL.RESOURCES]: {
      action: setOpenShareResourceModal,
      label: "Share Resource",
      icon: FileDirectoryIcon,
    },
  };

  if (!assertIsPageActionKey(pathname)) return null;

  const currentPageAction = pageActions[pathname];

  if (!currentPageAction) return null;

  const handleOpen = async () => {
    if (session) {
      currentPageAction.action(true);
    } else {
      await signIn(AUTH_PROVIDER.GITHUB);
    }
  };

  return (
    <Button variant={"success"} onClick={handleOpen} className="space-x-2">
      <currentPageAction.icon className="h-5 w-5" />
      <span className="hidden lg:block">{currentPageAction.label}</span>
    </Button>
  );
};
