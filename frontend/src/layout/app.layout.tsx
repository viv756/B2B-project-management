import { Outlet } from "react-router-dom";

import { AuthProvider } from "@/context/auth.provider";
import { AppSidebar } from "@/components/asidebar/appsidebar";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden">
          <div className="w-full">
            <>
              <Header />
              <div className="px-3 lg:px-20 py-3">
                <Outlet />
              </div>
            </>
            <CreateWorkspaceDialog />
            <CreateProjectDialog />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
