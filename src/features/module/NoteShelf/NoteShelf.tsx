import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { NoteCard } from "@src/features/module";
import { Module } from "@src/types";
import { NoteShelfStyled, NotesWrap, Title } from "./NoteShelf.styled";
import { useNoteShelf } from "./useNoteShelf";

type NoteShelfProps = {
  module: Module;
};

export const NoteShelf = (props: NoteShelfProps) => {
  const { module } = props;
  const { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onCreateNote, onUpdate, onDelete } = useNoteShelf();

  return (
    <NoteShelfStyled>
      <Title variant="h5" gutterBottom>
        {module.name}
        <IconButton onClick={onMenuOpen} size="small">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openedMenu} onClose={onMenuClose} onClick={onMenuClose}>
          <MenuItem onClick={() => onCreateNote(module)}>{t("createNote")}</MenuItem>
          <MenuItem onClick={() => onUpdate(module.id)}>{t("update")}</MenuItem>
          <MenuItem onClick={() => onDelete(module)}>{t("delete")}</MenuItem>
        </Menu>
      </Title>
      <NotesWrap>
        {module.expand["notes(module)"]?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </NotesWrap>
    </NoteShelfStyled>
  );
};
