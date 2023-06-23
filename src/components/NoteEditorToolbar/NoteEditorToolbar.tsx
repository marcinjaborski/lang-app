import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box, IconButton } from "@mui/material";
import { useSeparator, useTranslateText } from "@src/hooks";
import { useEditorContext } from "@src/hooks/useEditorContext";
import { startWritingTerm } from "@src/store";
import { align, bold, h1, h2, insertTerm, italic, ol, ul, underline, useAppDispatch } from "@src/util";
import React from "react";
import { ReactEditor } from "slate-react";

export const NoteEditorToolbar = () => {
  const editor = useEditorContext();
  const separator = useSeparator();
  const dispatch = useAppDispatch();
  const translate = useTranslateText();

  const onCreateWord = () => {
    dispatch(startWritingTerm());
    insertTerm(editor, separator);
    ReactEditor.focus(editor);
  };

  return (
    <Box>
      <IconButton onClick={onCreateWord}>
        <SchoolIcon />
      </IconButton>
      <IconButton onClick={translate}>
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
      <IconButton onClick={() => h1(editor)}>
        <Filter1Icon />
      </IconButton>
      <IconButton onClick={() => h2(editor)}>
        <Filter2Icon />
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
      <IconButton onClick={() => ul(editor)}>
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton onClick={() => ol(editor)}>
        <FormatListNumberedIcon />
      </IconButton>
    </Box>
  );
};
