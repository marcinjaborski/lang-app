import { Overwrite } from "@src/@types/types";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type ListType = "numbered-list" | "bulleted-list";

export type ElementType = "paragraph" | "heading-one" | "heading-two" | "list-item" | ListType;

export type RichElement = {
  type: ElementType;
  textAlign?: "left" | "right" | "center" | "justify";
  children: (TextElement | TermElement | RichElement)[];
};

export type TextFormatOption = "bold" | "italic" | "underline";

export type TextElement = { type: "text"; text: string } & {
  [K in TextFormatOption]?: boolean;
};

export type TermElement = Overwrite<TextElement, { type: "term" }> & {
  id?: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: RichElement;
    Text: TextElement | TermElement;
  }
}
