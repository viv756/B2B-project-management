import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../logo";
import useWorkspaceId from "@/hooks/use-workspace-is";
import { Link } from "react-router-dom";
import WorkspaceSwitcher from "./workspaceSwitcher";
import { Separator } from "../ui/separator";
import { NavMain } from "./nav-main";

export function AppSidebar() {
  // const { isLoading, user } = useAuthContext();
  const workspaceId = useWorkspaceId();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="!py-0 dark:bg-background">
        <div className="flex h-[50px] items-center justify-start w-full px-1">
          <Logo url={`/workspace/${workspaceId}`} />
          {open && (
            <Link
              to={`/workspace/${workspaceId}`}
              className="hidden md:flex ml-2 items-center gap-2 self-center font-medium">
              Team Sync.
            </Link>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className=" !mt-0 dark:bg-background">
        <SidebarGroup className="!py-0">
          <SidebarGroupContent>
            <WorkspaceSwitcher />
            <Separator />
            <NavMain />
            <Separator />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
