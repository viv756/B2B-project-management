import { parseAsBoolean, useQueryState } from "nuqs";

const useEditTaskDialog = () => {
  const [open, setOpen] = useQueryState("edit-task", parseAsBoolean.withDefault(false));

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return {
    open,
    onOpen,
    onClose,
  };
};

export default useEditTaskDialog;
