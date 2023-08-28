import { useEditorContext, useFormatters, useInsertTerm, useTranslateText } from "@src/hooks";
import {
  HeadingType,
  isHeadingType,
  isTextAlignOption,
  RichElement,
  TextAlignOption,
  TextElement,
  TextFormatOption,
} from "@src/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Editor, Element, Text } from "slate";

export const useToolbar = () => {
  const { t } = useTranslation("noteToolbar");
  const translate = useTranslateText();
  const insertTerm = useInsertTerm();
  const formatters = useFormatters();
  const editor = useEditorContext();
  const [, setDummy] = useState(true);

  useEffect(() => {
    const rerender = () => setDummy((prevState) => !prevState);

    document.addEventListener("selectionchange", rerender);
    return () => document.removeEventListener("selectionchange", rerender);
  }, []);

  const getCurrentElements = (type: "text" | "element") => {
    const { selection } = editor;
    if (!selection) return [];
    const [...currentNodes] = Editor.nodes(editor, {
      match: (n) => (type === "text" ? Text.isText(n) : Element.isElement(n)),
      at: selection,
    });
    return currentNodes.map((node) => node[0]);
  };

  const isActive = (format: TextFormatOption | TextAlignOption | HeadingType) => {
    if (isTextAlignOption(format) || isHeadingType(format)) {
      const currentElements = getCurrentElements("element") as RichElement[];
      if (isHeadingType(format)) {
        return currentElements.length > 0 && currentElements.every((node) => node.type === format);
      }
      return currentElements.length > 0 && currentElements.every((node) => node.textAlign === format);
    }
    const currentTextElements = getCurrentElements("text") as TextElement[];
    return currentTextElements.length > 0 && currentTextElements.every((node) => node[format]);
  };

  const onClick = (handler: () => void) => {
    setDummy((prevState) => !prevState);
    handler();
  };

  return { t, translate, insertTerm, formatters, isActive, onClick };
};
