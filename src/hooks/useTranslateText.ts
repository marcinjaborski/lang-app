import { useEditorContext, useSettings } from "@src/hooks";
import { useAppSelector } from "@src/store";
import { DEFAULT_SEPARATOR, translate } from "@src/util";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useTranslateText = () => {
  const editor = useEditorContext();
  const baseLang = useAppSelector((state) => state.noteDrawer.baseLang);
  const targetLang = useAppSelector((state) => state.noteDrawer.targetLang);
  const separator = useSettings()?.separator || DEFAULT_SEPARATOR;

  return async () => {
    const { selection } = editor;
    let selectedText = selection ? Editor.string(editor, selection) : "";
    if (selectedText === "") {
      Transforms.move(editor, { distance: 1, unit: "word", reverse: true, edge: "anchor" });
      const newSelection = editor.selection;
      selectedText = newSelection ? Editor.string(editor, newSelection) : "";
    }
    if (selectedText === "") return;
    const translatedText = await translate(selectedText, baseLang, targetLang);
    Transforms.collapse(editor, { edge: "end" });
    Transforms.insertText(editor, `${separator}${translatedText}`);
    ReactEditor.focus(editor);
  };
};
