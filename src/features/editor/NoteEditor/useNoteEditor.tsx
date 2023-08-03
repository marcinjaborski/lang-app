import { Element, Leaf } from "@src/features/editor";
import { useEditorContext, useEmptyElement, useFormatters, useNoteRepository, useTranslateText } from "@src/hooks";
import { changeTitle, useAppDispatch, useAppSelector } from "@src/store";
import { ElementType, isShortcut, NoteUrlParams } from "@src/types";
import { ZERO_WIDTH_SPACE } from "@src/util";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Editor, Element as SlateElement, Range, Transforms } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { useDebouncedCallback } from "use-debounce";

export const useNoteEditor = () => {
  const editor = useEditorContext();
  const { t } = useTranslation("noteEditor");
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.noteEditor.title);
  const translateText = useTranslateText();
  const formatters = useFormatters();
  const params = useParams<NoteUrlParams>();
  const emptyElement = useEmptyElement();
  const notes = useNoteRepository();
  const debounceSave = useDebouncedCallback(() => {
    notes.update.mutate({ id: params.id!, record: { content: JSON.stringify(editor.children) } });
  }, 10000);

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

  const preventDeletingZeroWidthSpace = () => {
    const { selection } = editor;
    if (!selection) return false;
    const prevNode = Editor.previous(editor, { at: selection });
    if (!prevNode) return false;
    return Editor.string(editor, prevNode[1]).at(-1) === ZERO_WIDTH_SPACE;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    debounceSave();

    if (event.key === "Backspace" && preventDeletingZeroWidthSpace()) {
      event.preventDefault();
      return;
    }

    if (event.key === "Enter" && endList()) {
      event.preventDefault();
      return;
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
