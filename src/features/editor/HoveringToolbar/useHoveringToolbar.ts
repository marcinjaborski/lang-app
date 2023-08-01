import { SelectChangeEvent } from "@mui/material";
import { useEditorContext, useInsertTerm, useTagsRepository, useTermRepository, useTranslateText } from "@src/hooks";
import { isTermElement, Term } from "@src/types";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Editor, Text } from "slate";
import { ReactEditor } from "slate-react";

export const useHoveringToolbar = () => {
  const editor = useEditorContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const translateText = useTranslateText();
  const insertTerm = useInsertTerm();
  const termRepository = useTermRepository();
  const tagsRepository = useTagsRepository();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsSelected, setTagsSelected] = useState(false);

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

      const [...selectedTermNodes] = Editor.nodes(editor, {
        match: (n) => Text.isText(n) && n.type === "term",
      });
      const selectedTerms: Term[] = [];
      for (const [selectedTermNode] of selectedTermNodes) {
        if (!isTermElement(selectedTermNode)) continue;
        const term = termRepository.list.data?.find((t) => t.id === selectedTermNode.id);
        if (term) selectedTerms.push(term);
      }
      setTags(_.intersection(...selectedTerms.map((t) => t.tags)));
      setTagsSelected(!!selectedTermNodes.length);

      const domRange = selection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.scrollY - el.offsetHeight - 10}px`;
      el.style.left = `${rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2}px`;
    };

    document.addEventListener("selectionchange", handleHoveringToolbar);

    return () => document.removeEventListener("selectionchange", handleHoveringToolbar);
  }, [termRepository.list.data]);

  const onInsertTerm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertTerm();
  };

  const onTagChange = (e: SelectChangeEvent<typeof tags>) => {
    const value = e.target.value;
    const newTags = typeof value === "string" ? value.split(",") : value;
    setTags(newTags);
    const [...selectedTerms] = Editor.nodes(editor, { match: (n) => Text.isText(n) && n.type === "term" });
    selectedTerms.forEach(([term]) => {
      if (isTermElement(term) && term.id) {
        termRepository.update.mutate({ id: term.id, record: { tags: newTags } });
      }
    });
  };

  return { ref, onInsertTerm, translateText, tagsRepository, tags, setTags, tagsSelected, onTagChange };
};
