import { Module } from "../util/types";
import { NoteShelfStyled } from "../styles/NoteShelf.styled";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoteCard from "./NoteCard";
import { useNoteShelf } from "../hooks/useNoteShelf";

type NoteShelfProps = {
  module: Module;
};

const NoteShelf = (props: NoteShelfProps) => {
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

export default NoteShelf;
