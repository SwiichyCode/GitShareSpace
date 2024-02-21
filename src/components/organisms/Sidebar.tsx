import { getServerAuthSession } from "@/server/auth";
import { SidebarDialog } from "@/components/organisms/SidebarDialog";
import { SidebarHeader } from "@/components/organisms/SidebarHeader";
import { SidebarNavigation } from "@/components/organisms/SidebarNavigation";

export const Sidebar = async () => {
  const session = await getServerAuthSession();

  return (
    <SidebarDialog dialogHeader={<SidebarHeader session={session} />}>
      <SidebarNavigation session={session} />
    </SidebarDialog>
  );
};
