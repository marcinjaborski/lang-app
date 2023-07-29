import { MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction } from "react";
import { useCreateNoteDialog } from "./useCreateNoteDialog";

type CreateNoteDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreateNoteDialog = ({ open, setOpen }: CreateNoteDialogProps) => {
  const { t, error, module, modules, setModule, onCreate } = useCreateNoteDialog(() => setOpen(false));
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label={t("module")}
          fullWidth
          variant="standard"
          value={module}
          error={!!error}
          helperText={error ? t(error.message) : null}
          onChange={(e) => setModule(e.target.value)}
        >
          {modules?.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
        <Button onClick={onCreate}>{t("create")}</Button>
      </DialogActions>
    </Dialog>
  );
};
