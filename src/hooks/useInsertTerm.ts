import { useEditorContext, useSeparator } from "@src/hooks";
import { moveToNextStep, startWritingTerm, useAppDispatch } from "@src/store";
import { ZERO_WIDTH_SPACE } from "@src/util";
import { BaseRange, Editor, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useInsertTerm = () => {
  const editor = useEditorContext();
  const separator = useSeparator();
  const dispatch = useAppDispatch();

  const replaceSelected = (selection: BaseRange) => {
    const selectedText = Editor.string(editor, selection);
    Transforms.setNodes(editor, { type: "term" }, { match: (n) => Text.isText(n), split: true });
    ReactEditor.focus(editor);
    Transforms.collapse(editor, { edge: "end" });
    dispatch(startWritingTerm());
    if (selectedText.includes(separator)) {
      dispatch(moveToNextStep());
    } else {
      Transforms.insertText(editor, separator);
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
    selection ? replaceSelected(selection) : insertNew();
  };
};
