import { Element, Leaf } from "@src/features/editor";
import { useCreateTerm, useEditorContext, useFormatters, useSeparator, useTranslateText } from "@src/hooks";
import { changeTitle, moveToNextStep, useAppDispatch, useAppSelector } from "@src/store";
import { ElementType, isShortcut, isTermElement } from "@src/types";
import { ZERO_WIDTH_SPACE } from "@src/util";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Descendant, Editor, Element as SlateElement, Range, Transforms } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";

export const useNoteEditor = () => {
  const editor = useEditorContext();
  const { t } = useTranslation("noteEditor");
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.noteEditor.title);
  const termPhase = useAppSelector((state) => state.noteEditor.termPhase);
  const translateText = useTranslateText();
  const separator = useSeparator();
  const { mutate: createTerm } = useCreateTerm();
  const formatters = useFormatters();
  const params = useParams<{ id: string }>();

  const emptyElement: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "", type: "text" }],
    },
  ];

  const keyBindings = {
    b: formatters.bold,
    i: formatters.italic,
    u: formatters.underline,
    t: translateText,
    l: formatters.alignLeft,
    e: formatters.center,
    r: formatters.alignRight,
    j: formatters.justify,
  } as const;

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props}>{props.children}</Leaf>, []);

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props}>{props.children}</Element>, []);

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
      const term = editor.selection && Editor.node(editor, editor.selection.focus)[0];
      Transforms.insertNodes(editor, { type: "text", text: ZERO_WIDTH_SPACE });
      if (isTermElement(term)) {
        const [base, translation] = term.text.split(separator);
        if (params.id) {
          createTerm({ base, translation, note: params.id });
        }
      }
    }
    dispatch(moveToNextStep());
  };

  const endList = (): boolean => {
    const { selection } = editor;
    if (!selection) return false;

    const [start] = Range.edges(selection);
    const list = Editor.above(editor, {
      at: start,
      match: (node) => SlateElement.isElement(node) && ["numbered-list", "bulleted-list"].includes(node.type),
    });
    if (!list) return false;

    const currentNode = Editor.node(editor, selection.focus)[0] as unknown as { type: ElementType; text: string };
    if (currentNode?.text !== "" || currentNode?.type !== "list-item") return false;

    const [path] = list[1];
    Transforms.removeNodes(editor);
    Transforms.insertNodes(editor, emptyElement, { at: [path + 1] });
    Transforms.move(editor, { unit: "offset" });
    return true;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && endList()) {
      event.preventDefault();
      return;
    }

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
    keyBindings[event.key]();
  };

  return { editor, t, emptyElement, renderLeaf, renderElement, title, onTitleChange, onKeyDown };
};