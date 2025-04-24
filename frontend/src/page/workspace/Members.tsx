import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import { Separator } from "@/components/ui/separator";
import AllMember from "@/components/workspace/member/all-member";
import InviteMember from "@/components/workspace/member/invite-member";

const Members = () => {
  return (
    <div className="w-full h-auto pt-2">
      <WorkspaceHeader />
      <Separator className="my-4" />
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          <div>
            <h2 className="text-lg leading-[30px] font-semibold mb-1">Workspace members</h2>
            <p className="text-sm text-muted-foreground">
              Workspace members can view and join all Workspace project, tasks and create new task
              in the Workspace.
            </p>
          </div>
          <Separator className="my-4" />
          {/* Invite user  */}
          <InviteMember />

          <AllMember/>
        </div>
      </main>
    </div>
  );
};

export default Members;
