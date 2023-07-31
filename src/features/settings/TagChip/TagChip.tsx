import { Chip } from "@mui/material";
import { ColorPicker } from "@src/components";
import { useClickAway } from "@src/hooks";
import { getTextColorToBgColor } from "@src/util";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TagChipProps } from "./types";

export const TagChip = ({ tag, onColorChange, onDelete }: TagChipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(tag.color || "");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const debouncedColorChange = useDebouncedCallback(() => onColorChange(tag, color), 1000);

  const onClickOutside = () => {
    setColorPickerOpen(false);
  };

  useEffect(() => {
    debouncedColorChange();
  }, [tag, color]);

  useClickAway(ref, onClickOutside, [tag, color]);

  return (
    <div ref={ref}>
      <Chip
        label={tag.label}
        onClick={() => setColorPickerOpen(true)}
        onDelete={() => onDelete(tag)}
        sx={{
          backgroundColor: color,
          color: getTextColorToBgColor(color),
          transitionProperty: "color, background-color",
        }}
      />
      <ColorPicker open={colorPickerOpen} color={color} setColor={setColor} />
    </div>
  );
};
