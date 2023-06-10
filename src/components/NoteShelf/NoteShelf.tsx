import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { NoteCard } from "@src/components";
import { Module } from "@src/util";
import { NoteShelfStyled } from "./NoteShelf.styled";
import { useNoteShelf } from "./useNoteShelf";

type NoteShelfProps = {
  module: Module;
};

export const NoteShelf = (props: NoteShelfProps) => {
  const { module } = props;
  const { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onDelete } = useNoteShelf();

  return (
    <NoteShelfStyled>
      <Typography variant="h5" className="module-title" gutterBottom>
        {module.name}
        <IconButton onClick={onMenuOpen} size="small">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openedMenu} onClose={onMenuClose}>
          <MenuItem onClick={() => onDelete(module)}>{t("delete")}</MenuItem>
        </Menu>
      </Typography>
      <Box className="notes">
        {module.expand["notes(module)"]?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </Box>
    </NoteShelfStyled>
  );
};
