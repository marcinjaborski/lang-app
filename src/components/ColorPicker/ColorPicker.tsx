import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { HexAlphaColorPicker } from "react-colorful";

type ColorPickerProps = {
  open: boolean;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export const ColorPicker = ({ open, color, setColor }: ColorPickerProps) => {
  if (!open) return null;

  return (
    <Box sx={{ position: "absolute", top: "calc(100% + 20px)" }}>
      {" "}
      <HexAlphaColorPicker color={color} onChange={setColor} />
    </Box>
  );
};
