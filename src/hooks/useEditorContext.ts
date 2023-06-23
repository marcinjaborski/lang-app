import { createContext, useContext } from "react";
import { Editor } from "slate";

export const EditorContext = createContext<Editor | null>(null);

export const useEditorContext = () => {
  const editor = useContext(EditorContext);

  if (!editor) {
    throw "useEditorContext must be inside context provider";
  }

  return editor;
};
