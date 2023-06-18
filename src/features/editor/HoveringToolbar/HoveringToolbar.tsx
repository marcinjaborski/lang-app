import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, SxProps } from "@mui/material";
import { Portal } from "@src/components";
import { HoveringToolbarStyled } from "@src/features/editor/HoveringToolbar/HoveringToolbar.styled";
import { useHoveringToolbar } from "@src/features/editor/HoveringToolbar/useHoveringToolbar";
import { translateText } from "@src/util";
import React from "react";
import { Editor } from "slate";

type HoveringToolbarProps = {
  editor: Editor;
};

export const HoveringToolbar = (props: HoveringToolbarProps) => {
  const { editor } = props;
  const { ref, onCreateWord, baseLang, targetLang } = useHoveringToolbar(editor);

  const sx: SxProps = {
    fill: "white",
  };

  return (
    <Portal>
      <HoveringToolbarStyled ref={ref}>
        <IconButton onClick={onCreateWord}>
          <SchoolIcon sx={sx} />
        </IconButton>
        <IconButton onClick={() => translateText(editor, baseLang, targetLang)}>
          <TranslateIcon sx={sx} />
        </IconButton>
      </HoveringToolbarStyled>
    </Portal>
  );
};
