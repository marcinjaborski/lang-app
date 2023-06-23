import { useEditorContext, useInsertTerm, useTranslateText } from "@src/hooks";

export const useNoteEditorToolbar = () => {
  const editor = useEditorContext();
  const translate = useTranslateText();
  const insertTerm = useInsertTerm();

  return { editor, translate, insertTerm };
};
