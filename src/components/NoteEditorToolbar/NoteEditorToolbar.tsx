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
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNoteEditorToolbar } from "@src/components/NoteEditorToolbar/useNoteEditorToolbar";
import React, { ReactNode } from "react";

type ToolbarButton = {
  tooltip: string;
  handler: () => void;
  icon: ReactNode;
};

export const NoteEditorToolbar = () => {
  const { t, translate, insertTerm, formatters } = useNoteEditorToolbar();

  const buttons: ToolbarButton[] = [
    {
      tooltip: t("term"),
      handler: insertTerm,
      icon: <SchoolIcon />,
    },
    {
      tooltip: t("translate"),
      handler: translate,
      icon: <TranslateIcon />,
    },
    {
      tooltip: t("bold"),
      handler: formatters.bold,
      icon: <FormatBoldIcon />,
    },
    {
      tooltip: t("italic"),
      handler: formatters.italic,
      icon: <FormatItalicIcon />,
    },
    {
      tooltip: t("underline"),
      handler: formatters.underline,
      icon: <FormatUnderlinedIcon />,
    },
    {
      tooltip: t("title"),
      handler: formatters.h1,
      icon: <Filter1Icon />,
    },
    {
      tooltip: t("subtitle"),
      handler: formatters.h2,
      icon: <Filter2Icon />,
    },
    {
      tooltip: t("alignLeft"),
      handler: formatters.alignLeft,
      icon: <FormatAlignLeftIcon />,
    },
    {
      tooltip: t("center"),
      handler: formatters.center,
      icon: <FormatAlignCenterIcon />,
    },
    {
      tooltip: t("alignRight"),
      handler: formatters.alignRight,
      icon: <FormatAlignRightIcon />,
    },
    {
      tooltip: t("justify"),
      handler: formatters.justify,
      icon: <FormatAlignJustifyIcon />,
    },
    {
      tooltip: t("ul"),
      handler: formatters.ul,
      icon: <FormatListBulletedIcon />,
    },
    {
      tooltip: t("ol"),
      handler: formatters.ol,
      icon: <FormatListNumberedIcon />,
    },
  ];

  return (
    <Box>
      {buttons.map((button) => (
        <Tooltip title={button.tooltip} key={button.tooltip}>
          <IconButton onClick={button.handler}>{button.icon}</IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
