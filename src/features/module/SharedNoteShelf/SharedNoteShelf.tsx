import { NoteCard } from "@src/features/module";
import { Note } from "@src/types";
import { useTranslation } from "react-i18next";

import { NoteShelfStyled, NotesWrap, Title } from "../NoteShelf/NoteShelf.styled";

type SharedNoteShelfProps = {
  notes: Note[];
};

export const SharedNoteShelf = (props: SharedNoteShelfProps) => {
  const { notes } = props;
  const { t } = useTranslation("home");

  return (
    <NoteShelfStyled>
      <Title gutterBottom variant="h5">
        {t("shared")}
      </Title>
      <NotesWrap>
        {notes.map((note, index) => (
          <NoteCard index={index} key={note.id} note={note} />
        ))}
      </NotesWrap>
    </NoteShelfStyled>
  );
};
