import { FormatListBulleted, FormatListNumbered } from "@mui/icons-material";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box, IconButton } from "@mui/material";
import { useSeparator } from "@src/hooks";
import { startWritingTerm } from "@src/store";
import { align, bold, insertTerm, italic, underline, useAppDispatch } from "@src/util";
import React from "react";
import { Editor } from "slate";
import { ReactEditor } from "slate-react";

type NoteEditorToolbarProps = {
  editor: Editor;
};

export const NoteEditorToolbar = (props: NoteEditorToolbarProps) => {
  const { editor } = props;
  const separator = useSeparator();
  const dispatch = useAppDispatch();

  const onCreateWord = () => {
    dispatch(startWritingTerm());
    insertTerm(editor, separator);
    ReactEditor.focus(editor);
  };

  return (
    <Box>
      <IconButton onClick={onCreateWord}>
        <TranslateIcon />
      </IconButton>
      <IconButton onClick={() => bold(editor)}>
        <FormatBoldIcon />
      </IconButton>
      <IconButton onClick={() => italic(editor)}>
        <FormatItalicIcon />
      </IconButton>
      <IconButton onClick={() => underline(editor)}>
        <FormatUnderlinedIcon />
      </IconButton>
      <IconButton onClick={() => align(editor, "left")}>
        <FormatAlignLeftIcon />
      </IconButton>
      <IconButton onClick={() => align(editor, "center")}>
        <FormatAlignCenterIcon />
      </IconButton>
      <IconButton onClick={() => align(editor, "right")}>
        <FormatAlignRightIcon />
      </IconButton>
      <IconButton onClick={() => align(editor, "justify")}>
        <FormatAlignJustifyIcon />
      </IconButton>
      <IconButton>
        <FormatListBulleted />
      </IconButton>
      <IconButton>
        <FormatListNumbered />
      </IconButton>
    </Box>
  );
};
