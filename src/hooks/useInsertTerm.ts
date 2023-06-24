import { useCreateTerm, useEditorContext, useSeparator } from "@src/hooks";
import { moveToNextStep, startWritingTerm, useAppDispatch } from "@src/store";
import { ZERO_WIDTH_SPACE } from "@src/util";
import { useParams } from "react-router-dom";
import { BaseRange, Editor, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useInsertTerm = () => {
  const editor = useEditorContext();
  const separator = useSeparator();
  const dispatch = useAppDispatch();
  const { mutate: create } = useCreateTerm();
  const params = useParams<{ id: string }>();

  const replaceSelected = (selection: BaseRange) => {
    const selectedText = Editor.string(editor, selection);
    Transforms.setNodes(editor, { type: "term" }, { match: (n) => Text.isText(n), split: true });
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
    if (params.id) {
      create({ base, translation, note: params.id });
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