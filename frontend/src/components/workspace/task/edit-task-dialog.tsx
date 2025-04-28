import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";

const EditTaskDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditTaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
