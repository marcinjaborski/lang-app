import React, { useCallback } from "react";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Descendant, Editor } from "slate";
import { useAppDispatch, useAppSelector } from "../../util/store";
import { changeTitle } from "./noteEditorSlice";
import Leaf from "./Leaf";
import DefaultElement from "./DefaultElement";
import { align, bold, italic, markAsWord, underline } from "../../util/formatters";
import { translateText } from "../../util/util";
import { Shortcut, shortcuts } from "../../util/types";

const isShortcut = (key: string): key is Shortcut => {
  return shortcuts.includes(key as Shortcut);
};

export const useNoteEditor = (editor: Editor) => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.noteEditor.title);
  const baseLang = useAppSelector((state) => state.noteDrawer.baseLang);
  const targetLang = useAppSelector((state) => state.noteDrawer.targetLang);
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const formatters = {
    q: () => markAsWord(editor),
    b: () => bold(editor),
    i: () => italic(editor),
    u: () => underline(editor),
    t: () => translateText(editor, baseLang, targetLang),
    l: () => align(editor, "left"),
    e: () => align(editor, "center"),
    r: () => align(editor, "right"),
    j: () => align(editor, "justify"),
  } as const;

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props}>{props.children}</Leaf>, []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props}>{props.children}</DefaultElement>,
    [],
  );

  const onTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(changeTitle(event.target.value));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return;
    }
    if (!isShortcut(event.key)) {
      return;
    }
    event.preventDefault();
    formatters[event.key]();
  };

  return { initialValue, renderLeaf, renderElement, title, onTitleChange, onKeyDown };
};
