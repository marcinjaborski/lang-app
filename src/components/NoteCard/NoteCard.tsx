import {
  Button,
  CardActions,
  CardContent,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Note } from "../../util/types";
import { NoteCardStyled } from "./NoteCard.styled";
import { useNoteCard } from "./useNoteCard";

type NoteCardProps = {
  note: Note;
};

const NoteCard = (props: NoteCardProps) => {
  const { note } = props;
  const { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, navigate, onDelete } = useNoteCard();

  return (
    <NoteCardStyled>
      <CardContent>
        <Typography color="text.primary" gutterBottom className="title">
          {note.title}
        </Typography>
        <IconButton onClick={onMenuOpen} size="small">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openedMenu} onClose={onMenuClose}>
          <MenuItem onClick={() => onDelete(note.id)}>{t("delete")}</MenuItem>
        </Menu>
        <LinearProgress variant="determinate" value={50} color="secondary" />
        <Typography className="excerpt">{note.excerpt}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth size="small" onClick={() => navigate(`/note/${note.id}`)}>
          <ExpandMoreIcon htmlColor="black" />
        </Button>
      </CardActions>
    </NoteCardStyled>
  );
};

export default NoteCard;
