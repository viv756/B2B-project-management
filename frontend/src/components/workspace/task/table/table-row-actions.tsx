import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { TaskType } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { deleteTaskMutationFn } from "@/lib/api";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn,
  });

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;

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
          <DropdownMenuItem className="cursor-pointer">Edit Task</DropdownMenuItem>
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
    </>
  );
}
