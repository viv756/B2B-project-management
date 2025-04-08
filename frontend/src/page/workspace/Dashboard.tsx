import { Button } from "@/components/ui/button";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Plus } from "lucide-react";

const WorkspaceDashboard = () => {
  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workspace Overview</h2>
          <p className="text-muted-foreground">Here&apos;s an overview for this workspace!</p>
        </div>
        <Button>
          <Plus />
          New project
        </Button>
      </div>
      <WorkspaceAnalytics />
    </main>
  );
};

export default WorkspaceDashboard;
