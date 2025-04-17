import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
<CreateTaskForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
