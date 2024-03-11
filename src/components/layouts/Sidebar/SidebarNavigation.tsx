import { GearIcon, PersonIcon, RepoIcon } from "@primer/octicons-react";
import { Separator } from "@/components/ui/separator";
import { SidebarNavigationLink } from "./SidebarNavigationLink";
import { SidebarSignout } from "./SidebarSignout";
import { SidebarAdministration } from "./SidebarAdministration";
import { URL } from "@/config/constants";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const SidebarNavigationItems = [
  {
    name: "Your Profile",
    href: URL.PROFILE,
    icon: PersonIcon,
  },
  {
    name: "Repositories",
    href: URL.REPOSITORIES,
    icon: RepoIcon,
  },
  {
    name: "Settings",
    href: URL.SETTINGS,
    icon: GearIcon,
  },
];

export const SidebarNavigation = ({ session }: Props) => {
  return (
    <nav className="space-y-2 text-sm">
      {SidebarNavigationItems.map((item) => (
        <SidebarNavigationLink key={item.name} href={item.href}>
          <item.icon className="h-4 w-4 text-subtle" />
          <span>{item.name}</span>
        </SidebarNavigationLink>
      ))}
      <Separator />
      <SidebarAdministration session={session} />
      <SidebarSignout />
    </nav>
  );
};
