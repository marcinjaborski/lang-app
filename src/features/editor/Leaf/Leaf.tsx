import { useTheme } from "@mui/material";
import { useTermRepository } from "@src/hooks";
import { openContextMenu, setTermDialogBase, setTermDialogTranslation, useAppDispatch } from "@src/store";
import { TermElement } from "@src/types";
import { getTextColorToBgColor } from "@src/util";
import { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const theme = useTheme();
  const termRepository = useTermRepository();
  const dispatch = useAppDispatch();

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  const getBgColor = (leaf: TermElement) => {
    const term = termRepository.list.data?.find((t) => t.id === leaf.id);
    if (term) {
      const firstColor = term.expand.tags?.findLast((t) => t.color)?.color;
      return firstColor || theme.palette.secondary.main;
    }
    return theme.palette.secondary.main;
  };

  const styles: CSSProperties = {};
  if (leaf.type === "term") {
    const term = termRepository.list.data?.find((t) => t.id === leaf.id);
    if (term) {
      const bgColor = getBgColor(leaf);
      styles.backgroundColor = bgColor;
      styles.color = getTextColorToBgColor(bgColor);
      styles.caretColor = theme.palette.primary.main;
      children = (
        <span
          style={styles}
          onContextMenu={(e) => {
            e.preventDefault();
            dispatch(setTermDialogBase(term.base));
            dispatch(setTermDialogTranslation(term.translation));
            dispatch(openContextMenu({ contextTermId: term.id, contextPosition: { top: e.clientY, left: e.clientX } }));
          }}
        >
          {children}
        </span>
      );
    }
  }

  return <span {...attributes}>{children}</span>;
};
