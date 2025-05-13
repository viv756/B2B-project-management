import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/reusable/confirm-dialog";
import EditTaskDialog from "../edit-task-dialog";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useEditTaskDialog from "@/hooks/use-edit-task-dialog";

import { deleteTaskMutationFn } from "@/lib/api";
import { TaskType } from "@/types/api.types";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const params = useParams();
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { onOpen } = useEditTaskDialog();
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn,
  });

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;
  const projectId = (row.original.project?._id as string) || (params.projectId as string) || "";

  const handleConfirm = () => {
    mutate(
      {
        workspaceId,
        taskId,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["all-tasks", workspaceId],
          });
          toast(data.message);
          setOpenDialog(false);
        },
        onError: (error) => {
          toast(error.message);
        },
      }
    );
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              onOpen();
            }}>
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`!text-destructive cursor-pointer ${taskId}`}
            onClick={() => {
              setMenuOpen(false);
              setOpenDialog(true);
            }}>
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <EditTaskDialog projectId={projectId} taskId={taskId} />
    </>
  );
}
