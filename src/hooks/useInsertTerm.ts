import { DEFAULT_SEPARATOR, useEditorContext, useNoteRepository, useSettings, useTermRepository } from "@src/hooks";
import { openCreateTermDialog, showError, useAppDispatch } from "@src/store";
import { NoteUrlParams } from "@src/types";
import { ZERO_WIDTH_SPACE } from "@src/util";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BaseRange, Editor, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useInsertTerm = () => {
  const { t } = useTranslation("noteEditor");
  const editor = useEditorContext();
  const separator = useSettings()?.separator || DEFAULT_SEPARATOR;
  const dispatch = useAppDispatch();
  const terms = useTermRepository();
  const notes = useNoteRepository();
  const params = useParams<NoteUrlParams>();

  const replaceSelected = (selection: BaseRange) => {
    if (!params.id) return;

    const selectedText = Editor.string(editor, selection);
    if (!selectedText.includes(separator)) {
      dispatch(showError(t("noSeparator")));
      return;
    }

    const [base, translation] = selectedText.split(separator);
    const alreadyExistingTerm = terms.list.data?.find(
      (term) => term.base === base && term.expand.note?.id === params.id,
    );
    if (alreadyExistingTerm) {
      dispatch(showError(t("termAlreadyExists")));
      return;
    }

    terms.create.mutate(
      { base, translation, note: params.id },
      {
        onSuccess({ id }) {
          Transforms.setNodes(editor, { type: "term", id }, { match: (n) => Text.isText(n), split: true });
          ReactEditor.focus(editor);
          Transforms.collapse(editor, { edge: "end" });
          Transforms.insertNodes(editor, { type: "text", text: ZERO_WIDTH_SPACE });
          notes.update.mutate({ id: params.id!, record: { content: JSON.stringify(editor.children) } });
        },
      },
    );
  };

  const insertNew = () => dispatch(openCreateTermDialog());

  return () => {
    const { selection } = editor;
    const selectedText = selection && Editor.string(editor, selection);
    selectedText ? replaceSelected(selection) : insertNew();
  };
};
