import { useTheme } from "@mui/material";
import { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const theme = useTheme();

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
    styles.caretColor = theme.palette.primary.main;
  }

  return (
    <span style={styles} {...attributes}>
      {children}
    </span>
  );
};
