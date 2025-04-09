import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
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
      <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
        <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
          <TabsTrigger className="py-2" value="projects">
            Recent Projects
          </TabsTrigger>
          <TabsTrigger className="py-2" value="tasks">
            Recent Tasks
          </TabsTrigger>
          <TabsTrigger className="py-2" value="members">
            Recent Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <RecentProjects />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default WorkspaceDashboard;
