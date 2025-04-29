import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";

interface EditTaskprops {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId: string;
  workspaceId: string;
}

const EditTaskDialog = (props: EditTaskprops) => {
  const { isOpen, onClose, projectId, taskId } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditTaskForm projectId={projectId} taskId={taskId} onClose={onClose} isOpen={isOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
