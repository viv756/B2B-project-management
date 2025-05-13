import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";
import useEditTaskDialog from "@/hooks/use-edit-task-dialog";

interface EditTaskprops {
  projectId: string;
  taskId: string;
}

const EditTaskDialog = (props: EditTaskprops) => {
  const { projectId, taskId } = props;
  const { open, onClose } = useEditTaskDialog();

  return (
    <Dialog modal={false} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditTaskForm projectId={projectId} taskId={taskId} onClose={onClose} isOpen={open} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
