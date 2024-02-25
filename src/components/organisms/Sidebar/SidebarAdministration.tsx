import { AdminWrapper } from "@/components/organisms/AdminWrapper";
import { SidebarSyncRepositories } from "./SidebarSyncRepositories";
import { SidebarRefreshAgreement } from "./SidebarRefreshAgreement";
import { SidebarRemoveStarredRepositories } from "./SidebarRemoveStarredRepositories";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const SidebarAdministration = ({ session }: Props) => {
  return (
    session?.user && (
      <AdminWrapper role={session.user.role}>
        <SidebarSyncRepositories />
        <SidebarRemoveStarredRepositories />
        <SidebarRefreshAgreement />
      </AdminWrapper>
    )
  );
};
