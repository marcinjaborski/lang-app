import { useEditorContext, useInsertTerm, useTranslateText } from "@src/hooks";
import React, { useEffect, useRef } from "react";
import { ReactEditor } from "slate-react";

export const useHoveringToolbar = () => {
  const editor = useEditorContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const translateText = useTranslateText();
  const insertTerm = useInsertTerm();

  useEffect(() => {
    const handleHoveringToolbar = () => {
      const el = ref.current;
      const selection = window.getSelection();

      if (!el || !selection || !editor) {
        return;
      }

      if (!ReactEditor.isFocused(editor) || selection.toString() === "") {
        el.removeAttribute("style");
        return;
      }

      const domRange = selection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.scrollY - el.offsetHeight - 10}px`;
      el.style.left = `${rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2}px`;
    };

    document.addEventListener("selectionchange", handleHoveringToolbar);

    return () => document.removeEventListener("selectionchange", handleHoveringToolbar);
  }, []);

  const onInsertTerm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertTerm();
  };

  return { ref, onInsertTerm, translateText };
};
