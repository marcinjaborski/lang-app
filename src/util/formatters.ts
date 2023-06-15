import { TextFormatOption } from "@src/@types";
import { Editor, Node, Text, Transforms, Element } from "slate";

const format = (editor: Editor, option: TextFormatOption) => {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => Text.isText(n) && !!n[option],
  });
  Transforms.setNodes(editor, { [option]: !match }, { match: (n) => Text.isText(n), split: true });
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

export const align = (editor: Editor, alignment: "left" | "right" | "center" | "justify") => {
  Transforms.setNodes(editor, { textAlign: alignment });
};

const heading = (editor: Editor, variant: "heading-one" | "heading-two") => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === variant,
  });
  Transforms.setNodes(editor, { type: !match ? variant : "paragraph" });
};

export const h1 = (editor: Editor) => {
  heading(editor, "heading-one");
};

export const h2 = (editor: Editor) => {
  heading(editor, "heading-two");
};
