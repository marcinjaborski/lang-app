import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, SxProps } from "@mui/material";
import { Portal } from "@src/components";
import React from "react";
import { HoveringToolbarStyled } from "./HoveringToolbar.styled";
import { useHoveringToolbar } from "./useHoveringToolbar";

export const HoveringToolbar = () => {
  const { ref, onInsertTerm, translateText } = useHoveringToolbar();

  const sx: SxProps = {
    fill: "white",
  };

  return (
    <Portal>
      <HoveringToolbarStyled ref={ref}>
        <IconButton onClick={onInsertTerm}>
          <SchoolIcon sx={sx} />
        </IconButton>
        <IconButton onClick={translateText}>
          <TranslateIcon sx={sx} />
        </IconButton>
      </HoveringToolbarStyled>
    </Portal>
  );
};
