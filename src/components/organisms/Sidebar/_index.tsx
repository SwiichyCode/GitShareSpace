import { getServerAuthSession } from "@/server/auth";
import { SidebarDialog } from "@/components/organisms/Sidebar/SidebarDialog";
import { SidebarHeader } from "@/components/organisms/Sidebar/SidebarHeader";
import { SidebarNavigation } from "@/components/organisms/Sidebar/SidebarNavigation";

export const Sidebar = async () => {
  const session = await getServerAuthSession();

  return (
    <SidebarDialog dialogHeader={<SidebarHeader session={session} />}>
      <SidebarNavigation session={session} />
    </SidebarDialog>
  );
};
