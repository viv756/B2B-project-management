import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetWorkspaceMemmbers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";

import { editTaskMutationFn } from "@/lib/api";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import { cn } from "@/lib/utils";
import { getAvatarColor, getAvatarFallbackText, transformOptions } from "@/lib/helper";
import { TaskType } from "@/types/api.types";

const EditTaskForm = (props: {
  projectId: string;
  taskId: string;
  isOpen: boolean;
  task: TaskType;
  onClose: () => void;
}) => {
  const { projectId, taskId, onClose, isOpen, task } = props;

  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editTaskMutationFn,
  });

  const formSchema = z.object({
    title: z.string().trim().min(1, {
      message: "Title is required",
    }),
    description: z.string().trim(),

    status: z.enum(Object.values(TaskStatusEnum) as [keyof typeof TaskStatusEnum], {
      required_error: "Status is required",
    }),
    priority: z.enum(Object.values(TaskPriorityEnum) as [keyof typeof TaskPriorityEnum], {
      required_error: "Priority is required",
    }),
    assignedTo: z.string().trim().min(1, {
      message: "AssignedTo is required",
    }),
    dueDate: z.date({
      required_error: "Due date is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (task) {
      form.setValue("title", task.title);
      form.setValue("description", task.description ?? "");
      form.setValue("assignedTo", task.assignedTo?._id ?? "");
      form.setValue("dueDate", new Date(task.dueDate));
      form.setValue("status", task.status);
      form.setValue("priority", task.priority);
    }
  }, [form, isOpen, task]);

  const { data: memberData } = useGetWorkspaceMemmbers(workspaceId);

  const members = memberData?.members || [];

  const taskStatusList = Object.values(TaskStatusEnum);
  const taskPriorityList = Object.values(TaskPriorityEnum); // ["LOW", "MEDIUM", "HIGH", "URGENT"]

  const statusOptions = transformOptions(taskStatusList);
  const priorityOptions = transformOptions(taskPriorityList);

  // Workspace Memebers
  const membersOptions = members?.map((member) => {
    const name = member.userId?.name || "Unknown";
    const initials = getAvatarFallbackText(name);
    const avatarColor = getAvatarColor(name);

    return {
      label: (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      ),
      value: member.userId._id,
    };
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    const payload = {
      taskId,
      workspaceId,
      projectId,
      data: {
        ...values,
        dueDate: values.dueDate.toISOString(),
      },
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["project-analytics", projectId],
        });

        queryClient.invalidateQueries({
          queryKey: ["all-tasks", workspaceId],
        });

        toast("Task has been updated", {
          description: format(Date.now(), "yyyy-MM-dd HH:mm"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        onClose();
      },
      onError: (error) => {
        toast(error.message, {
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
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update task details to reflect changes in scope, priority, assignees, or deadlines.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-3" />

        {!task ? (
          <div className="w-full h-[520px] flex items-center justify-center max-w-full">
            <Loader className="animate-spin " />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Task title</FormLabel>
                      <FormControl>
                        <Input placeholder="Website Redesign" className="!h-[48px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Task description
                        <span className="text-xs font-extralight ml-2">Optional</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea rows={1} placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Assigned To</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a assignee" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent position="popper">
                            <div className="w-full max-h-[200px] overflow-y-auto scrollbar">
                              {membersOptions?.map((option) => (
                                <SelectItem
                                  className="cursor-pointer"
                                  key={option.value}
                                  value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* {Due Date} */}
              <div className="!mt-2">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full flex-1 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={
                              (date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                                date > new Date("2100-12-31") //Prevent selection beyond a far future date
                            }
                            initialFocus
                            defaultMonth={new Date()}
                            fromMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              className="!text-muted-foreground !capitalize"
                              placeholder="Select a status"
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent position="popper">
                          {statusOptions?.map((status) => (
                            <SelectItem
                              className="!capitalize"
                              key={status.value}
                              value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* {Priority} */}
              <div>
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          {priorityOptions?.map((priority) => (
                            <SelectItem
                              className="!capitalize"
                              key={priority.value}
                              value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="flex place-self-end  h-[40px] text-white font-semibold"
                type="submit"
                disabled={isPending}>
                {isPending && <Loader className="animate-spin" />}
                Update
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditTaskForm;
