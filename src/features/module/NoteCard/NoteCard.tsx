import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActions, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Note } from "@src/types";
import { Excerpt, NoteCardStyled, NoteProgress, StyledCardContent } from "./NoteCard.styled";
import { useNoteCard } from "./useNoteCard";

type NoteCardProps = {
  note: Note;
};

export const NoteCard = (props: NoteCardProps) => {
  const { note } = props;
  const { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, navigate, onDelete } = useNoteCard();

  return (
    <NoteCardStyled>
      <StyledCardContent>
        <Typography gutterBottom>{note.title}</Typography>
        <IconButton onClick={onMenuOpen} size="small">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openedMenu} onClose={onMenuClose}>
          <MenuItem onClick={() => onDelete(note.id)}>{t("delete")}</MenuItem>
        </Menu>
        <NoteProgress variant="determinate" value={50} color="secondary" />
        <Excerpt>{note.excerpt}</Excerpt>
      </StyledCardContent>
      <CardActions>
        <Button fullWidth size="small" onClick={() => navigate(`/note/${note.id}`)}>
          <ExpandMoreIcon htmlColor="black" />
        </Button>
      </CardActions>
    </NoteCardStyled>
  );
};
