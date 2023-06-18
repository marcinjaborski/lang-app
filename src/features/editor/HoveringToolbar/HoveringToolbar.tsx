import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, SxProps } from "@mui/material";
import { Portal } from "@src/components";
import { HoveringToolbarStyled } from "@src/features/editor/HoveringToolbar/HoveringToolbar.styled";
import { useHoveringToolbar } from "@src/features/editor/HoveringToolbar/useHoveringToolbar";
import { translateText } from "@src/util";
import React from "react";

export const HoveringToolbar = () => {
  const { editor, ref, onCreateWord, baseLang, targetLang } = useHoveringToolbar();

  if (!editor) return null;

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
