import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { setTermDialogBase, setTermDialogTranslation } from "@src/store";

import { useCreateTermDialog } from "./useCreateTermDialog";

export const CreateTermDialog = () => {
  const { t, open, dispatch, separator, onCreate, onTranslate, onClose, base, translation } = useCreateTermDialog();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        <TextField
          label={t("base")}
          value={base}
          variant="standard"
          onChange={(e) => dispatch(setTermDialogBase(e.target.value))}
        />
        <Typography variant="h4">{separator}</Typography>
        <TextField
          label={t("translation")}
          value={translation}
          variant="standard"
          onChange={(e) => dispatch(setTermDialogTranslation(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={onTranslate}>{t("translate")}</Button>
        <Button onClick={onCreate}>{t("create")}</Button>
      </DialogActions>
    </Dialog>
  );
};
