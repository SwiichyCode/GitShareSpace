import { withAdminRole } from "@/components/withAdminRole";
import { SidebarSyncRepositories } from "./SidebarSyncRepositories";
import { SidebarRefreshAgreement } from "./SidebarRefreshAgreement";
import { SidebarRemoveStarredRepositories } from "./SidebarRemoveStarredRepositories";
import { SidebarUpdateUserRole } from "./SidebarUpdateUserRole";
import { SidebarRemoveRepositoryComments } from "./SidebarRemoveRepositoryComments";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const AdminSidebar = () => (
  <>
    <SidebarSyncRepositories />
    <SidebarRemoveStarredRepositories />
    <SidebarRefreshAgreement />
    <SidebarUpdateUserRole />
    <SidebarRemoveRepositoryComments />
  </>
);
const AdminSidebarWithRole = withAdminRole(AdminSidebar);

export const SidebarAdministration = ({ session }: Props) => {
  return session?.user && <AdminSidebarWithRole role={session.user.role} />;
};
