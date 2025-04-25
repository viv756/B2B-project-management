import { useState } from "react";
import { parseAsBoolean, useQueryState } from "nuqs";

const useConfirmDialog = () => {
  const [open, setOpen] = useQueryState(
    "confirm-dialog",
    parseAsBoolean.withDefault(false)
  );
  const [context, setContext] = useState<any>(null);

  const onOpenDialog = (data?: any) => {
    setContext(data || null);
    setOpen(true);
  };

  const onCloseDialog = () => {
    setContext(null);
    setOpen(false);
  };

  return {
    open,
    context,
    onOpenDialog,
    onCloseDialog,
  };
};

export default useConfirmDialog;
