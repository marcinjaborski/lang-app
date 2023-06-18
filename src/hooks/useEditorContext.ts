import { createContext, useContext } from "react";
import { Editor } from "slate";

export const EditorContext = createContext<Editor | null>(null);

export const useEditorContext = () => {
  return useContext(EditorContext);
};
