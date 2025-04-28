import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const EditTaskForm = (props: { projectId?: string }) => {
  const { projectId } = props;

  const formSchema = z.object({
    title: z.string().trim().min(1, {
      message: "Title is required",
    }),
    description: z.string().trim(),
    projectId: z.string().trim().min(1, {
      message: "Project is required",
    }),
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
      description: "",
      projectId: projectId ? projectId : "",
    },
  });
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
        <Form {...form}>
          <form className="space-y-3">
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="w-full max-h-[200px] overflow-y-auto scrollbar ">
                          <SelectItem className="cursor-pointer" value="nnn">
                            nnn
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
                      <SelectContent>
                        <SelectItem className="!capitalize" value="jjj">
                          backlog
                        </SelectItem>
                        <SelectItem className="!capitalize" value="jjj">
                          Todo
                        </SelectItem>
                        <SelectItem className="!capitalize" value="jjj">
                          In progress
                        </SelectItem>
                        <SelectItem className="!capitalize" value="jjj">
                          In review
                        </SelectItem>
                        <SelectItem className="!capitalize" value="jjj">
                          Done
                        </SelectItem>
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
                      <SelectContent>
                        <SelectItem className="!capitalize" value="fff">
                          Low
                        </SelectItem>
                        <SelectItem className="!capitalize" value="fff">
                          Medium
                        </SelectItem>
                        <SelectItem className="!capitalize" value="fff">
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit">
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditTaskForm;
