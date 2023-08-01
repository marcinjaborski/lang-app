import { useEditorContext, useNoteRepository, useSettings, useTermRepository } from "@src/hooks";
import { moveToNextStep, startWritingTerm, useAppDispatch } from "@src/store";
import { NoteUrlParams } from "@src/types";
import { ZERO_WIDTH_SPACE } from "@src/util";
import { useParams } from "react-router-dom";
import { BaseRange, Editor, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useInsertTerm = () => {
  const editor = useEditorContext();
  const separator = useSettings().separator;
  const dispatch = useAppDispatch();
  const terms = useTermRepository();
  const notes = useNoteRepository();
  const params = useParams<NoteUrlParams>();

  const replaceSelected = (selection: BaseRange) => {
    const selectedText = Editor.string(editor, selection);
    Transforms.setNodes(editor, { type: "term" }, { match: (n) => Text.isText(n), split: true });
    const [insertedTerm] = Editor.nodes(editor, { match: (n) => Text.isText(n) && n.type === "term" });
    ReactEditor.focus(editor);
    Transforms.collapse(editor, { edge: "end" });
    if (!selectedText.includes(separator)) {
      Transforms.insertText(editor, separator);
      dispatch(startWritingTerm());
      dispatch(moveToNextStep());
      return;
    }
    const [base, translation] = selectedText.split(separator);
    if (translation === "") {
      dispatch(startWritingTerm());
      dispatch(moveToNextStep());
      return;
    }
    Transforms.insertNodes(editor, { type: "text", text: ZERO_WIDTH_SPACE });
    if (params.id) {
      terms.create.mutate(
        { base, translation, note: params.id },
        {
          onSuccess({ id }) {
            Transforms.setNodes(editor, { id }, { at: insertedTerm[1] });
            notes.update.mutate({ id: params.id!, record: { content: JSON.stringify(editor.children) } });
          },
        },
      );
    }
  };

  const insertNew = () => {
    dispatch(startWritingTerm());
    Transforms.insertNodes(editor, [
      {
        type: "term",
        text: `${ZERO_WIDTH_SPACE}${separator}`,
      },
    ]);
    Transforms.move(editor, { distance: separator.length, unit: "offset", reverse: true });
    ReactEditor.focus(editor);
  };

  return () => {
    const { selection } = editor;
    const selectedText = selection && Editor.string(editor, selection);
    selectedText ? replaceSelected(selection) : insertNew();
  };
};
