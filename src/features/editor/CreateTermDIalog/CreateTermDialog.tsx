import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useCreateTermDialog } from "./useCreateTermDialog";

export const CreateTermDialog = () => {
  const { t, open, separator, onCreate, onTranslate, onClose, ...state } = useCreateTermDialog();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        <TextField
          label={t("base")}
          variant="standard"
          value={state.base}
          onChange={(e) => state.setBase(e.target.value)}
        />
        <Typography variant="h4">{separator}</Typography>
        <TextField
          label={t("translation")}
          variant="standard"
          value={state.translation}
          onChange={(e) => state.setTranslation(e.target.value)}
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
