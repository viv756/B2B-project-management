import { Dialog, DialogContent } from "./ui/dialog";
import CreateWorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialogue";

const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();
  console.log("Dialog open state:", open); // Debugging
  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        <CreateWorkspaceForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
