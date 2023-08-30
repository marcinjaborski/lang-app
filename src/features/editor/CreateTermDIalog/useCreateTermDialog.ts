import { useEditorContext, useNoteRepository, useSettings, useTermRepository } from "@src/hooks";
import {
  closeCreateTermDialog,
  setTermDialogBase,
  setTermDialogTranslation,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
import { NoteUrlParams } from "@src/types";
import { translate, ZERO_WIDTH_SPACE } from "@src/util";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useCreateTermDialog = () => {
  const { t } = useTranslation("createTermDialog");
  const noteEditorState = useAppSelector((state) => state.noteEditor);
  const open = noteEditorState.createDialogOpen;
  const baseLang = useAppSelector((state) => state.noteDrawer.baseLang);
  const targetLang = useAppSelector((state) => state.noteDrawer.targetLang);
  const dispatch = useAppDispatch();
  const separator = useSettings()?.separator;
  const base = useAppSelector((state) => state.noteEditor.termDialogBase);
  const translation = useAppSelector((state) => state.noteEditor.termDialogTranslation);
  const terms = useTermRepository();
  const notes = useNoteRepository();
  const editor = useEditorContext();
  const params = useParams<NoteUrlParams>();

  const onClose = () => {
    dispatch(closeCreateTermDialog());
    dispatch(setTermDialogBase(""));
    dispatch(setTermDialogTranslation(""));
  };

  const onCreate = () => {
    if (!params.id) return;
    terms.create.mutate(
      { base, translation, note: params.id },
      {
        onSuccess({ id }) {
          Transforms.insertNodes(editor, { type: "term", id, text: `${base}${separator}${translation}` });
          ReactEditor.focus(editor);
          Transforms.insertNodes(editor, { type: "text", text: ZERO_WIDTH_SPACE });
          Transforms.move(editor, { distance: 1, unit: "character" });
          Transforms.insertNodes(editor, { type: "text", text: " " });
          notes.update.mutate({ id: params.id!, record: { content: JSON.stringify(editor.children) } });
        },
      },
    );

    onClose();
  };

  const onTranslate = async () => {
    const translation = await translate(base, baseLang, targetLang);
    dispatch(setTermDialogTranslation(translation));
  };

  return { t, open, dispatch, separator, onCreate, onTranslate, onClose, base, translation };
};
