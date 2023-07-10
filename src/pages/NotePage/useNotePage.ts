import { useNoteRepository, useSettings } from "@src/hooks";
import {
  changeBaseLang,
  changeTargetLang,
  changeTitle,
  clearState,
  openDrawer,
  updateStateFromNote,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
import { NoteToCreate, NoteUrlParams } from "@src/types";
import { pb } from "@src/util";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createEditor } from "slate";
import { withReact } from "slate-react";

export const useNotePage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const params = useParams<NoteUrlParams>();
  const dispatch = useAppDispatch();
  const onOpenDrawer = () => dispatch(openDrawer());
  const title = useAppSelector((state) => state.noteEditor.title);
  const drawerState = useAppSelector((state) => state.noteDrawer);
  const notes = useNoteRepository();
  const settings = useSettings();

  useEffect(() => {
    if (!params.id) {
      dispatch(changeTitle(""));
      dispatch(clearState());
      dispatch(changeBaseLang(settings.baseLang));
      dispatch(changeTargetLang(settings.targetLang));
      return;
    }
    notes.view.refetch().then(({ data: note }) => {
      if (!note) {
        return;
      }
      editor.children = JSON.parse(note.content);
      dispatch(changeTitle(note.title));
      dispatch(updateStateFromNote(note));
    });
  }, []);

  const onSave = () => {
    const newNote: NoteToCreate = {
      title,
      content: JSON.stringify(editor.children),
      owner: pb.authStore.model!.id,
      module: drawerState.module,
      excerpt: drawerState.excerpt,
      baseLang: drawerState.baseLang,
      targetLang: drawerState.targetLang,
    };
    if (params.id) {
      notes.update.mutate({ id: params.id, note: newNote });
      return;
    }
    notes.create.mutate(newNote);
  };

  return { editor, onOpenDrawer, onSave };
};
