import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Loader } from "lucide-react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceMemmbers from "@/hooks/api/use-get-workspace-members";
import { useAuthContext } from "@/context/auth.provider";

import { Permissions } from "@/constant";
import { changeWorkspaceMemberRoleMutationFn } from "@/lib/api";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";

const AllMember = () => {
  const { user, hasPermission } = useAuthContext();

  const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetWorkspaceMemmbers(workspaceId);
  const members = data?.members || [];
  const roles = data?.roles || [];

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeWorkspaceMemberRoleMutationFn,
  });

  const handleSelect = (roleId: string, memberId: string) => {
    if (!roleId || !memberId) return;
    const payload = {
      workspaceId,
      data: {
        roleId,
        memberId,
      },
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members", workspaceId],
        });

        toast("Member's role changed successfully", {
           description: format(Date.now(), "yyyy-MM-dd HH:mm"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
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
    <div className="grid gap-6 pt-2">
      {isPending ? <Loader className="w-8 h-8 animate-spin place-self-center flex" /> : null}

      {members?.map((member) => {
        const name = member.userId?.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <div className="flex items-center justify-between space-x-4" key={member.userId._id}>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.userId?.profilePicture || ""} alt="Image" />
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-sm text-muted-foreground">{member.userId.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto min-w-24 capitalize disabled:opacity-95 disabled:pointer-events-none"
                    disabled={isLoading || !canChangeMemberRole || member.userId._id === user?._id}>
                    {member.role.name?.toLowerCase()}{" "}
                    {canChangeMemberRole && member.userId._id !== user?._id && (
                      <ChevronDown className="text-muted-foreground" />
                    )}
                  </Button>
                </PopoverTrigger>
                {canChangeMemberRole && (
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput
                        placeholder="Select new role..."
                        disabled={isLoading}
                        className="disabled:pointer-events-none"
                      />
                      <CommandList>
                        {isLoading ? (
                          <Loader className="w-8 h-8 animate-spin place-self-center flex my-4" />
                        ) : (
                          <>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                              {roles?.map(
                                (role) =>
                                  role.name !== "OWNER" && (
                                    <CommandItem
                                      key={role._id}
                                      disabled={isLoading}
                                      className="disabled:pointer-events-none gap-1 mb-1  flex flex-col items-start px-4 py-2 cursor-pointer"
                                      onSelect={() => {
                                        handleSelect(role._id, member.userId._id);
                                      }}>
                                      <p className="capitalize">{role.name?.toLowerCase()}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {role.name === "ADMIN" &&
                                          `Can view, create, edit tasks, project and manage settings .`}

                                        {role.name === "MEMBER" &&
                                          `Can view,edit only task created by.`}
                                      </p>
                                    </CommandItem>
                                  )
                              )}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllMember;
