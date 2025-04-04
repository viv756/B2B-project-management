import { AppSidebar } from "@/components/asidebar/appsidebar";
import CreateWorkspaceDialog from "@/components/create-workspace-dialog";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
