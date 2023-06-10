import { RenderLeafProps } from "slate-react";

export const Leaf = (props: RenderLeafProps) => {
  const { children, leaf, attributes } = props;
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecoration: leaf.underline ? "underline" : "none",
      }}
    >
      {children}
    </span>
  );
};
