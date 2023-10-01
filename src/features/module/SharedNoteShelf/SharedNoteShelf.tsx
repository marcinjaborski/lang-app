import { NoteCard } from "@src/features/module";
import { Note } from "@src/types";
import { Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { NoteShelfStyled, NotesWrap, Title } from "../NoteShelf/NoteShelf.styled";

type SharedNoteShelfProps = {
  notes: Note[];
};

export const SharedNoteShelf = (props: SharedNoteShelfProps) => {
  const { notes } = props;
  const { t } = useTranslation("home");

  return (
    <Droppable direction="horizontal" droppableId="shared" isDropDisabled={true}>
      {(provided) => (
        <NoteShelfStyled ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={false}>
          <Title gutterBottom variant="h5">
            {t("shared")}
          </Title>
          <NotesWrap>
            {notes.map((note, index) => (
              <NoteCard index={index} isDraggable={false} key={note.id} note={note} />
            ))}
          </NotesWrap>
        </NoteShelfStyled>
      )}
    </Droppable>
  );
};
