import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { Overwrite } from "./types";

export const listTypes = ["numbered-list", "bulleted-list"] as const;
export const elementTypes = ["paragraph", "heading-one", "heading-two", "list-item", ...listTypes] as const;

export type ListType = (typeof listTypes)[number];
export type ElementType = (typeof elementTypes)[number];

export type RichElement = {
  type: ElementType;
  textAlign?: "left" | "right" | "center" | "justify";
  children: (TextElement | TermElement | RichElement)[];
};

export type TextFormatOption = "bold" | "italic" | "underline";

export type TextElement = { type: "text"; text: string; id?: null } & {
  [K in TextFormatOption]?: boolean;
};

export type TermElement = Overwrite<TextElement, { type: "term"; id?: string }>;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: RichElement;
    Text: TextElement | TermElement;
  }
}
