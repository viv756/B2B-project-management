import { AppSidebar } from "@/components/asidebar/appsidebar";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";
import { AuthProvider } from "@/context/auth.provider";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden">
          <SidebarTrigger />
          <div className="w-full">
            <Outlet />
            <CreateWorkspaceDialog />
            <CreateProjectDialog/>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
