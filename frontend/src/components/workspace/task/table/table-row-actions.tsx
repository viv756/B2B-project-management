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

import { TaskType } from "@/types/api.types";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
  onDelete: (taskId: string, taskCode: string) => void;
  onEdit: (value: TaskType) => void;
}

export function DataTableRowActions({ row, onDelete, onEdit }: DataTableRowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;

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
              onEdit(row.original);
            }}>
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`!text-destructive cursor-pointer ${taskId}`}
            onClick={() => {
              setMenuOpen(false);
              onDelete(taskId, taskCode);
            }}>
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
