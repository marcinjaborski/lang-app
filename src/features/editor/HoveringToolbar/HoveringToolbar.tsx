import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box, Chip, IconButton, MenuItem, Select, SxProps } from "@mui/material";
import { Portal } from "@src/components";
import { getTextColorToBgColor } from "@src/util";
import React from "react";

import { HoveringToolbarStyled } from "./HoveringToolbar.styled";
import { useHoveringToolbar } from "./useHoveringToolbar";

export const HoveringToolbar = () => {
  const { ref, onInsertTerm, translateText, tagsRepository, tags, tagsSelected, onTagChange } = useHoveringToolbar();

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
        {tagsSelected ? (
          <Select
            multiple
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const tag = tagsRepository.list.data?.find((tag) => tag.id === value);
                  if (!tag) return null;
                  return (
                    <Chip
                      key={value}
                      label={tag.label}
                      sx={{ color: getTextColorToBgColor(tag.color), backgroundColor: tag.color }}
                    />
                  );
                })}
              </Box>
            )}
            sx={{ svg: { color: "#FFFFFF" } }}
            value={tags}
            variant="standard"
            onChange={onTagChange}
          >
            {tagsRepository.list.data?.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.label}
              </MenuItem>
            ))}
          </Select>
        ) : null}
      </HoveringToolbarStyled>
    </Portal>
  );
};
