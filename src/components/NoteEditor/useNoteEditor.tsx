import { isSeparatorProps, isTermProps } from "@src/@types";
import { Separator } from "@src/components/NoteEditor/Separator";
import { Term } from "@src/components/NoteEditor/TermElement";
import { useSeparator } from "@src/hooks";
import { changeTitle, moveToNextStep } from "@src/store";
import {
  align,
  bold,
  italic,
  Shortcut,
  shortcuts,
  translateText,
  underline,
  useAppDispatch,
  useAppSelector,
} from "@src/util";
import React, { useCallback } from "react";
import { Descendant, Editor, Transforms } from "slate";
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
  const termPhase = useAppSelector((state) => state.noteEditor.termPhase);
  const separator = useSeparator();
  const emptyElement: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "", type: "text" }],
    },
  ];

  const formatters = {
    b: () => bold(editor),
    i: () => italic(editor),
    u: () => underline(editor),
    t: () => translateText(editor, baseLang, targetLang),
    l: () => align(editor, "left"),
    e: () => align(editor, "center"),
    r: () => align(editor, "right"),
    j: () => align(editor, "justify"),
  } as const;

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    if (isSeparatorProps(props)) return <Separator {...props}>{props.children}</Separator>;
    return <Leaf {...props}>{props.children}</Leaf>;
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    if (isTermProps(props)) return <Term {...props}>{props.children}</Term>;
    return <DefaultElement {...props}>{props.children}</DefaultElement>;
  }, []);

  const onTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(changeTitle(event.target.value));
  };

  const handleTerm = () => {
    if (termPhase === "writing") {
      Transforms.move(editor, {
        distance: separator.length,
        unit: "character",
      });
    } else {
      Transforms.insertNodes(editor, emptyElement);
    }
    dispatch(moveToNextStep());
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && termPhase) {
      event.preventDefault();
      handleTerm();
    }
    if (!event.ctrlKey) {
      return;
    }
    if (!isShortcut(event.key)) {
      return;
    }
    event.preventDefault();
    formatters[event.key]();
  };

  return { emptyElement, renderLeaf, renderElement, title, onTitleChange, onKeyDown };
};
