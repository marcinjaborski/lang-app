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
      <Title variant="h5" gutterBottom>
        {t("shared")}
      </Title>
      <NotesWrap>
        {notes.map((note, index) => (
          <NoteCard key={note.id} note={note} index={index} />
        ))}
      </NotesWrap>
    </NoteShelfStyled>
  );
};
