import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { format } from "date-fns";

import EmojiPickerComponent from "@/components/emoji-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { toast } from "sonner";

import { createProjectMutationFn } from "@/lib/api";

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const [emoji, setEmoji] = useState("📊");

  const { mutate, isPending } = useMutation({
    mutationFn: createProjectMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Project title is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEmojiSelection = (emoji: string) => {
    setEmoji(emoji);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    const payload = {
      workspaceId,
      data: {
        emoji,
        ...values,
      },
    };
    mutate(payload, {
      onSuccess: (data) => {
        const project = data.project;
        queryClient.invalidateQueries({
          queryKey: ["allprojects", workspaceId],
        });

        toast(`Project created successfully`, {
          description: format(Date.now(), "yyyy-MM-dd HH:mm"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });

        navigate(`/workspace/${workspaceId}/project/${project._id}`);
        setTimeout(() => onClose(), 500);
      },
      onError: (error) => {
        console.log(error);
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
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left">
            Create Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage tasks, resources, and team collaboration
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Emoji</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="font-normal size-[60px] !p-2 !shadow-none mt-2 items-center rounded-full ">
                    <span className="text-4xl">{emoji}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className=" !p-0">
                  <EmojiPickerComponent onSelectEmoji={handleEmojiSelection} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Project title</FormLabel>
                    <FormControl>
                      <Input placeholder="Website Redesign" className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Project description
                      <span className="text-xs font-extralight ml-2">Optional</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Projects description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isPending}
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit">
              {isPending && <Loader className="animate-spin" />}
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
