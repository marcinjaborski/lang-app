import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { NoteCard } from "@src/features/module";
import { Module } from "@src/types";
import { Droppable } from "react-beautiful-dnd";

import { NoteShelfStyled, NotesWrap, Title } from "./NoteShelf.styled";
import { useNoteShelf } from "./useNoteShelf";

type NoteShelfProps = {
  module: Module;
};

export const NoteShelf = (props: NoteShelfProps) => {
  const { module } = props;
  const { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onCreateNote, onUpdate, onDelete } = useNoteShelf();

  return (
    <Droppable direction="horizontal" droppableId={module.id}>
      {(provided, snapshot) => (
        <NoteShelfStyled ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
          <Title gutterBottom variant="h5">
            {module.name}
            <IconButton size="small" onClick={onMenuOpen}>
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openedMenu} onClick={onMenuClose} onClose={onMenuClose}>
              <MenuItem onClick={() => onCreateNote(module)}>{t("createNote")}</MenuItem>
              <MenuItem onClick={() => onUpdate(module.id)}>{t("update")}</MenuItem>
              <MenuItem onClick={() => onDelete(module)}>{t("delete")}</MenuItem>
            </Menu>
          </Title>
          <NotesWrap>
            {module.expand["notes(module)"]?.map((note, index) => <NoteCard index={index} key={note.id} note={note} />)}
            {provided.placeholder}
          </NotesWrap>
        </NoteShelfStyled>
      )}
    </Droppable>
  );
};
