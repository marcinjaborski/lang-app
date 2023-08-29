import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useCreateDialog } from "./useCreateDialog";

export const CreateDialog = () => {
  const { t, state, onClose, onCreate, onNameChange, isError, error } = useCreateDialog();

  return (
    <Dialog open={state.open} onClose={onClose}>
      <DialogTitle>{t(`title.${state.type}`)}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={isError}
          fullWidth
          helperText={error ? t(error.message) : null}
          label={t("textFieldLabel")}
          margin="dense"
          variant="standard"
          onChange={onNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={onCreate}>{t(`confirm.${state.type}`)}</Button>
      </DialogActions>
    </Dialog>
  );
};
