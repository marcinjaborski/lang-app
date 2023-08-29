import { Button, Dialog, DialogActions, DialogTitle, Menu, MenuItem } from "@mui/material";

import { useContextMenu } from "./useContextMenu";

export const ContextMenu = () => {
  const { t, open, contextPosition, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, onDelete, onUpdate, onClose } =
    useContextMenu();

  return (
    <>
      <Menu
        anchorPosition={contextPosition}
        anchorReference="anchorPosition"
        open={open}
        onClick={onClose}
        onClose={onClose}
      >
        <MenuItem onClick={onUpdate}>{t("update")}</MenuItem>
        <MenuItem onClick={() => setConfirmDeleteDialogOpen(true)}>{t("delete")}</MenuItem>
      </Menu>
      <Dialog open={confirmDeleteDialogOpen}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialogOpen(false)}>{t("cancel")}</Button>
          <Button onClick={onDelete}>{t("delete")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
