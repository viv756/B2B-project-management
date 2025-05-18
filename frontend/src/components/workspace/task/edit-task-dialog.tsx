import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";

import { TaskType } from "@/types/api.types";

interface EditTaskprops {
  projectId: string;
  taskId: string;
  isOpen: boolean;
  task: TaskType;
  onClose: () => void;
}

const EditTaskDialog = (props: EditTaskprops) => {
  const { projectId, taskId, isOpen, onClose, task } = props;

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditTaskForm
          projectId={projectId}
          taskId={taskId}
          onClose={onClose}
          isOpen={isOpen}
          task={task}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
