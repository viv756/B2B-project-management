import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";

import { TaskType } from "@/types/api.types";

interface EditTaskprops {
  isOpen: boolean;
  task: TaskType;
  onClose: () => void;
}

const EditTaskDialog = (props: EditTaskprops) => {
  const { isOpen, onClose, task } = props;

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditTaskForm onClose={onClose} task={task} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
