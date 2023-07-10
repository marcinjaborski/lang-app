import { useEditorContext, useSettings } from "@src/hooks";
import { useAppSelector } from "@src/store";
import { translate } from "@src/util";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useTranslateText = () => {
  const editor = useEditorContext();
  const baseLang = useAppSelector((state) => state.noteDrawer.baseLang);
  const targetLang = useAppSelector((state) => state.noteDrawer.targetLang);
  const separator = useSettings().separator;

  return async () => {
    const { selection } = editor;
    if (!selection) return;
    let selectedText = Editor.string(editor, selection);
    if (selectedText === "") {
      Transforms.move(editor, { distance: 1, unit: "word", reverse: true, edge: "anchor" });
      selectedText = Editor.string(editor, selection);
    }
    const translatedText = await translate(selectedText, baseLang, targetLang);
    Transforms.collapse(editor, { edge: "end" });
    Transforms.insertText(editor, `${separator}${translatedText}`);
    ReactEditor.focus(editor);
  };
};
