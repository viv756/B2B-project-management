import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { ConfirmDialog } from "@/components/reusable/confirm-dialog";
import PermissionsGuard from "@/components/reusable/permission-guard";
import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/hooks/use-confirm-dialog";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { toast } from "sonner";

import { useAuthContext } from "@/context/auth.provider";
import { Permissions } from "@/constant";
import { deleteWorkspaceMutationFn } from "@/lib/api";

const DeleteWorkspaceCard = () => {
  const { workspace } = useAuthContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { open, onOpenDialog, onCloseDialog } = useConfirmDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkspaceMutationFn,
  });

  const handleConfirm = () => {
    mutate(workspaceId, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["userWorkspaces"],
        });
        navigate(`/workspace/${data.currentWorkspace}`);
        setTimeout(() => onCloseDialog(), 100);
      },
      onError: (error) => {
        toast(`${error.message}`, {
          description: format(Date.now(), "yyyy-MM-dd HH:mm"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    });
  };
  return (
    <>
      <div className="w-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left">
            Delete Workspace
          </h1>
        </div>

        <PermissionsGuard showMessage requiredPermission={Permissions.DELETE_WORKSPACE}>
          <div className="flex flex-col items-start justify-between py-0">
            <div className="flex-1 mb-2">
              <p>
                Deleting a workspace is a permanent action and cannot be undone. Once you delete a
                workspace, all its associated data, including projects, tasks, and member roles,
                will be permanently removed. Please proceed with caution and ensure this action is
                intentional.
              </p>
            </div>
            <Button
              className="shrink-0 flex place-self-end h-[40px]"
              variant="destructive"
              onClick={onOpenDialog}>
              Delete Workspace
            </Button>
          </div>
        </PermissionsGuard>

        <ConfirmDialog
          isOpen={open}
          isLoading={isPending}
          onClose={onCloseDialog}
          onConfirm={handleConfirm}
          title={`Delete  ${workspace?.name} Workspace`}
          description={`Are you sure you want to delete? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </>
  );
};

export default DeleteWorkspaceCard;
