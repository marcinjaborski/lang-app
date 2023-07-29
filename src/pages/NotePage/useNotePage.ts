import { useEmptyElement, useNoteRepository } from "@src/hooks";
import { changeTitle, openDrawer, updateStateFromNote, useAppDispatch, useAppSelector } from "@src/store";
import { NoteToCreate, NoteUrlParams } from "@src/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEditor } from "slate";
import { withReact } from "slate-react";

export const useNotePage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const params = useParams<NoteUrlParams>();
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.noteEditor.title);
  const drawerState = useAppSelector((state) => state.noteDrawer);
  const notes = useNoteRepository();
  const emptyElement = useEmptyElement();
  const navigate = useNavigate();

  useEffect(() => {
    notes.view.refetch().then(({ data: note }) => {
      if (!note) {
        return;
      }
      try {
        editor.children = JSON.parse(note.content);
      } catch (e) {
        editor.children = emptyElement;
      }
      dispatch(changeTitle(note.title));
      dispatch(updateStateFromNote(note));
    });
  }, []);

  if (!params.id) navigate("/");

  const onOpenDrawer = () => dispatch(openDrawer());

  const onSave = () => {
    const newNote: NoteToCreate = {
      title,
      content: JSON.stringify(editor.children),
      module: drawerState.module,
      excerpt: drawerState.excerpt,
      baseLang: drawerState.baseLang,
      targetLang: drawerState.targetLang,
    };
    notes.update.mutate({ id: params.id!, note: newNote });
  };

  return { editor, onOpenDrawer, onSave };
};
