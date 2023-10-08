import CreateIcon from "@mui/icons-material/Create";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActions, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { TextWithNewLines } from "@src/components";
import { ShareNoteDialog } from "@src/features/module";
import { Note } from "@src/types";
import { mapLanguageToFlag, serialize } from "@src/util";
import { Draggable } from "react-beautiful-dnd";
import ReactCountryFlag from "react-country-flag";

import { Excerpt, NoteCardStyled, NoteProgress, StyledCardContent } from "./NoteCard.styled";
import { useNoteCard } from "./useNoteCard";

type NoteCardProps = {
  index: number;
  note: Note;
  isDraggable?: boolean;
};

export const NoteCard = (props: NoteCardProps) => {
  const { note, index, isDraggable = true } = props;
  const {
    t,
    progress,
    anchorEl,
    baseLang,
    targetLang,
    setShareDialogOpen,
    shareDialogOpen,
    openedMenu,
    onMenuOpen,
    onMenuClose,
    navigate,
    onDelete,
  } = useNoteCard(note);
  const fallbackExcerpt = serialize(note.content);

  return (
    <Draggable draggableId={note.id} index={index} isDragDisabled={!isDraggable}>
      {(provided) => (
        <NoteCardStyled ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <StyledCardContent>
            <Typography gutterBottom>{note.title}</Typography>
            <IconButton size="small" onClick={onMenuOpen}>
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openedMenu} onClick={onMenuClose} onClose={onMenuClose}>
              {isDraggable ? <MenuItem onClick={() => setShareDialogOpen(true)}>{t("shareNote")}</MenuItem> : null}
              <MenuItem onClick={() => onDelete(note.id)}>{t("delete")}</MenuItem>
            </Menu>
            <ShareNoteDialog note={note} open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} />
            <NoteProgress color="secondary" value={progress} variant="determinate" />
            <Excerpt>{note.excerpt || <TextWithNewLines>{fallbackExcerpt}</TextWithNewLines>}</Excerpt>
          </StyledCardContent>
          <CardActions>
            <ReactCountryFlag countryCode={mapLanguageToFlag(baseLang)} svg />
            <Button fullWidth size="small" onClick={() => navigate(`/note/${note.id}`)}>
              <CreateIcon htmlColor="gray" />
            </Button>
            <ReactCountryFlag countryCode={mapLanguageToFlag(targetLang)} svg />
          </CardActions>
        </NoteCardStyled>
      )}
    </Draggable>
  );
};
