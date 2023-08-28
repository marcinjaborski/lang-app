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
import React, { ReactNode } from "react";
import { useToolbar } from "./useToolbar";

type ToolbarButton = {
  tooltip: string;
  handler: () => void;
  icon: ReactNode;
  isActive?: boolean;
};

export const Toolbar = () => {
  const { t, translate, insertTerm, formatters, onClick, isActive } = useToolbar();

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
      isActive: isActive("bold"),
    },
    {
      tooltip: t("italic"),
      handler: formatters.italic,
      icon: <FormatItalicIcon />,
      isActive: isActive("italic"),
    },
    {
      tooltip: t("underline"),
      handler: formatters.underline,
      icon: <FormatUnderlinedIcon />,
      isActive: isActive("underline"),
    },
    {
      tooltip: t("title"),
      handler: formatters.h1,
      icon: <Filter1Icon />,
      isActive: isActive("heading-one"),
    },
    {
      tooltip: t("subtitle"),
      handler: formatters.h2,
      icon: <Filter2Icon />,
      isActive: isActive("heading-two"),
    },
    {
      tooltip: t("alignLeft"),
      handler: formatters.alignLeft,
      icon: <FormatAlignLeftIcon />,
      isActive: isActive("left"),
    },
    {
      tooltip: t("center"),
      handler: formatters.center,
      icon: <FormatAlignCenterIcon />,
      isActive: isActive("center"),
    },
    {
      tooltip: t("alignRight"),
      handler: formatters.alignRight,
      icon: <FormatAlignRightIcon />,
      isActive: isActive("right"),
    },
    {
      tooltip: t("justify"),
      handler: formatters.justify,
      icon: <FormatAlignJustifyIcon />,
      isActive: isActive("justify"),
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
          <IconButton
            onClick={() => onClick(button.handler)}
            color={button.isActive ? "primary" : undefined}
            sx={{ transition: "color 200ms" }}
          >
            {button.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
