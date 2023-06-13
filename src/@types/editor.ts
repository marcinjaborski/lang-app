import { BaseEditor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

export type ParagraphElement = {
  type: "paragraph";
  textAlign?: "left" | "right" | "center" | "justify";
  children: TextElement[];
};

export type TermElement = {
  type: "term";
  children: [TextElement, SeparatorElement, TextElement];
};

export type TextElement = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type SeparatorElement = {
  type: "separator";
  text: string;
};

export type LeafProps<T> = RenderLeafProps & {
  leaf: T;
};

export type ElementProps<T> = RenderElementProps & {
  element: T;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | TermElement;
    Text: TextElement | SeparatorElement;
  }
}
