import { useEditorContext } from "@src/hooks";
import { isRichElement, ListType, TextFormatOption } from "@src/types";
import { BasePoint, BaseRange, Editor, Element, Range, Text, Transforms } from "slate";

export const useFormatters = () => {
  const editor = useEditorContext();

  const style = (option: TextFormatOption) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && !!n[option],
    });
    Transforms.setNodes(editor, { [option]: !match }, { match: (n) => Text.isText(n), split: true });
  };

  const align = (alignment: "left" | "right" | "center" | "justify") => {
    Transforms.setNodes(editor, { textAlign: alignment });
  };

  const heading = (variant: "heading-one" | "heading-two") => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === variant,
    });
    Transforms.setNodes(editor, { type: !match ? variant : "paragraph" });
  };

  const transformToParagraph = (start: BasePoint) => {
    // Transform each list item into paragraph
    Transforms.setNodes(
      editor,
      { type: "paragraph" },
      { match: (node) => Element.isElement(node) && node.type === "list-item" },
    );

    // If list has no more list items remove it
    const updatedList = Editor.above(editor, {
      at: start,
      match: (node) => Element.isElement(node) && (node.type === "numbered-list" || node.type === "bulleted-list"),
    });

    if (!updatedList) {
      return;
    }

    const numberOfListItems = updatedList[0].children.reduce((acc, n) => (n.type === "list-item" ? acc + 1 : acc), 0);
    if (numberOfListItems === 0) {
      Transforms.unwrapNodes(editor, {
        at: start,
        match: (node) => Element.isElement(node) && (node.type === "numbered-list" || node.type === "bulleted-list"),
      });
    }
  };

  const transformToList = (selection: BaseRange, type: ListType) => {
    // Transform each element into list item
    const nodes = Array.from(Editor.nodes(editor, { at: selection }));
    nodes.forEach(([node, path]) => {
      if (!isRichElement(node)) return;
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

  const list = (type: ListType) => {
    const { selection } = editor;
    if (!selection) {
      return;
    }

    const [start] = Range.edges(selection);
    const isList = Editor.above(editor, {
      at: start,
      match: (node) => Element.isElement(node) && (node.type === "numbered-list" || node.type === "bulleted-list"),
    });

    if (isList) {
      transformToParagraph(start);
    } else {
      transformToList(selection, type);
    }
  };

  const bold = () => style("bold");
  const italic = () => style("italic");
  const underline = () => style("underline");
  const alignLeft = () => align("left");
  const center = () => align("center");
  const alignRight = () => align("right");
  const justify = () => align("justify");
  const h1 = () => heading("heading-one");
  const h2 = () => heading("heading-two");
  const ol = () => list("numbered-list");
  const ul = () => list("bulleted-list");

  return { bold, italic, underline, alignLeft, center, alignRight, justify, h1, h2, ol, ul };
};
