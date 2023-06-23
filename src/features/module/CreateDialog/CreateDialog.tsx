import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useCreateDialog } from "./useCreateDialog";

export const CreateDialog = () => {
  const { t, open, onClose, onCreate, onNameChange, isError, error } = useCreateDialog();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("textFieldLabel")}
          fullWidth
          variant="standard"
          onChange={onNameChange}
          error={isError}
          helperText={error ? t(error.message) : null}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={onCreate}>{t("create")}</Button>
      </DialogActions>
    </Dialog>
  );
};
