import { useEmptyElement, useNoteRepository, useSettings } from "@src/hooks";
import {
  changeBaseLang,
  changeTargetLang,
  changeTitle,
  openDrawer,
  updateStateFromNote,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
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
  const settings = useSettings();

  useEffect(() => {
    if (!settings) return;
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
      dispatch(changeBaseLang(settings.baseLang));
      dispatch(changeTargetLang(settings.targetLang));
      dispatch(updateStateFromNote(note));
    });
  }, [settings]);

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
      shared: drawerState.shared.map((user) => user.id),
    };
    notes.update.mutate({ id: params.id!, record: newNote });
  };

  return { editor, onOpenDrawer, onSave };
};
