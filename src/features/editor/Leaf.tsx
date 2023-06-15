import { primaryColor } from "@src/util";
import { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  const styles: CSSProperties = {};
  if (leaf.type === "term") {
    styles.backgroundColor = "yellow";
    styles.caretColor = primaryColor;
  }

  return (
    <span style={styles} {...attributes}>
      {children}
    </span>
  );
};
