import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { SharedChipsWrap, ShareNoteDialogStyled } from "@src/features/module/ShareNoteDialog/ShareNoteDialog.styled";
import { useNoteRepository, useUserRepository } from "@src/hooks";
import { Note } from "@src/types";
import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

type ShareNoteDialogProps = {
  note: Note;
  open: boolean;
  onClose: () => void;
};

export const ShareNoteDialog = ({ note, open, onClose }: ShareNoteDialogProps) => {
  const { t } = useTranslation("home", { keyPrefix: "shareNoteDialog" });
  const [shareTo, setShareTo] = useState("");
  const { getByUsername } = useUserRepository();
  const notes = useNoteRepository();

  const onShare = async () => {
    const user = await getByUsername(shareTo);
    if (!user) return;
    notes.update.mutate(
      { id: note.id, record: { "shared+": user.id } },
      {
        onSuccess() {
          setShareTo("");
        },
      },
    );
  };

  const onUnShare = async (id: string) => {
    notes.update.mutate({ id: note.id, record: { "shared-": id } });
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    await onShare();
  };

  const handleClose = () => {
    onClose();
    setShareTo("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <ShareNoteDialogStyled>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel htmlFor="share-note-to">{t("username")}</InputLabel>
          <Input
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={onShare}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            id="share-note-to"
            value={shareTo}
            onChange={(e) => setShareTo(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </FormControl>
        <SharedChipsWrap>
          {note.expand.shared?.map(({ id, username }) => (
            <Chip key={id} label={username} onDelete={() => onUnShare(id)} />
          ))}
        </SharedChipsWrap>
      </ShareNoteDialogStyled>
      <DialogActions>
        <Button onClick={handleClose}>{t("close")}</Button>
      </DialogActions>
    </Dialog>
  );
};
