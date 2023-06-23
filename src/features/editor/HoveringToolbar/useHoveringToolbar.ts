import { useSeparator, useTranslateText } from "@src/hooks";
import { useEditorContext } from "@src/hooks/useEditorContext";
import { moveToNextStep, startWritingTerm, useAppDispatch } from "@src/store";
import React, { useEffect, useRef } from "react";
import { Editor, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useHoveringToolbar = () => {
  const editor = useEditorContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const separator = useSeparator();
  const translateText = useTranslateText();

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

  const onCreateWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!editor?.selection) return;
    const selectedText = Editor.string(editor, editor.selection);
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

  return { ref, onCreateWord, translateText };
};
