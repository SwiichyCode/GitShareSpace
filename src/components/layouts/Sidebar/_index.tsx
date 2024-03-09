import { getServerAuthSession } from "@/config/server/auth";
import { SidebarDialog } from "@/components/layouts/Sidebar/SidebarDialog";
import { SidebarHeader } from "@/components/layouts/Sidebar/SidebarHeader";
import { SidebarNavigation } from "@/components/layouts/Sidebar/SidebarNavigation";

export const Sidebar = async () => {
  const session = await getServerAuthSession();

  return (
    <SidebarDialog dialogHeader={<SidebarHeader session={session} />}>
      <SidebarNavigation session={session} />
    </SidebarDialog>
  );
};
