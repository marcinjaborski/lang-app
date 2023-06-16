import { ListType, TextFormatOption } from "@src/@types";
import { Editor, Text, Transforms, Element, Range, BasePoint, BaseRange } from "slate";

const format = (editor: Editor, option: TextFormatOption) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && !!n[option],
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

const transformToParagraph = (editor: Editor, start: BasePoint, type: ListType) => {
  // Transform each list item into paragraph
  Transforms.setNodes(
    editor,
    { type: "paragraph" },
    { match: (node) => Element.isElement(node) && node.type === "list-item" },
  );

  // If list has no more list items remove it
  const updatedList = Editor.above(editor, {
    at: start,
    match: (node) => Element.isElement(node) && node.type === type,
  });

  if (!updatedList) {
    return;
  }

  const numberOfListItems = updatedList[0].children.reduce((acc, n) => (n.type === "list-item" ? acc + 1 : acc), 0);
  if (numberOfListItems === 0) {
    Transforms.unwrapNodes(editor, {
      at: start,
      match: (node) => Element.isElement(node) && node.type === type,
    });
  }
};

const transformToList = (editor: Editor, selection: BaseRange, type: ListType) => {
  // Transform each element into list item
  const nodes = Array.from(Editor.nodes(editor, { at: selection }));
  nodes.forEach(([node, path]) => {
    Transforms.setNodes(
      editor,
      {
        ...node,
        type: "list-item",
      },
      { at: path },
    );
  });

  // Wrap selection into ul or ol
  Transforms.wrapNodes(editor, {
    type,
    children: nodes.map(([node]) => node) as Element[],
  });
};

const list = (editor: Editor, type: ListType) => {
  const { selection } = editor;
  if (!selection) {
    return;
  }

  const [start] = Range.edges(selection);
  const isList = Editor.above(editor, {
    at: start,
    match: (node) => Element.isElement(node) && node.type === type,
  });

  if (isList) {
    transformToParagraph(editor, start, type);
  } else {
    transformToList(editor, selection, type);
  }
};

export const ol = (editor: Editor) => {
  list(editor, "numbered-list");
};

export const ul = (editor: Editor) => {
  list(editor, "bulleted-list");
};
