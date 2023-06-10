import { changeTitle } from "@src/store";
import {
  align,
  bold,
  italic,
  markAsWord,
  Shortcut,
  shortcuts,
  translateText,
  underline,
  useAppDispatch,
  useAppSelector,
} from "@src/util";
import React, { useCallback } from "react";
import { Descendant, Editor } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { DefaultElement } from "./DefaultElement";
import { Leaf } from "./Leaf";

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
