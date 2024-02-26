import { withAdminRole } from "@/components/_HOC/withAdminRole";
import { SidebarSyncRepositories } from "./SidebarSyncRepositories";
import { SidebarRefreshAgreement } from "./SidebarRefreshAgreement";
import { SidebarRemoveStarredRepositories } from "./SidebarRemoveStarredRepositories";
import { SidebarUpdateUserRole } from "./SidebarUpdateUserRole";
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
  </>
);
const AdminSidebarWithRole = withAdminRole(AdminSidebar);

export const SidebarAdministration = ({ session }: Props) => {
  return session?.user && <AdminSidebarWithRole role={session.user.role} />;
};
