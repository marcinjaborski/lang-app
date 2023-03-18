import { Editor, Node, Text, Transforms } from "slate";
import { ParagraphElement } from "./types";

const format = (editor: Editor, option: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => (n as any)[option],
  });
  Transforms.setNodes(editor, { [option]: !match } as Partial<Node>, { match: (n) => Text.isText(n), split: true });
};

export const bold = (editor: Editor) => {
  format(editor, "bold");
};

export const italic = (editor: Editor) => {
  format(editor, "italic");
};

export const underline = (editor: Editor) => {
  format(editor, "underline");
};

export const markAsWord = (editor: Editor) => {
  format(editor, "isWord");
};

export const align = (editor: Editor, alignment: "left" | "right" | "center" | "justify") => {
  Transforms.setNodes(editor, { textAlign: alignment } as Partial<Node>, {
    match: (n) => Editor.isBlock(editor, <ParagraphElement>n),
  });
};
