import { Box, IconButton } from "@mui/material";
import { align, bold, italic, underline } from "../util/formatters";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { FormatListBulleted, FormatListNumbered } from "@mui/icons-material";
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import React, { useCallback, useState } from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import axios from "axios";
import { NoteEditorStyled } from "../styles/NoteEditor.styled";

export type ParagraphElement = {
  type: "paragraph";
  textAlign?: "left" | "right" | "center" | "justify";
  children: TextElement[];
};

type TextElement = {
  text: string;
  isWord?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement;
    Text: TextElement;
  }
}

const translate = async (text: string, sourceLang: string, targetLang: string) => {
  if (sourceLang === "gb") {
    sourceLang = "en";
  }
  const response = await axios.get(process.env.REACT_APP_DEEPL_URL!, {
    params: {
      auth_key: process.env.REACT_APP_DEEPL_KEY,
      text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    },
  });
  return response.data.translations[0].text;
};

const NoteEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "Start Typing..." }],
    },
  ];

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} children={props.children} />, []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props} children={props.children} />,
    [],
  );

  return (
    <NoteEditorStyled className="note-editor-root ">
      <Box>
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
      <Slate editor={editor} value={initialValue}>
        <Editable renderLeaf={renderLeaf} renderElement={renderElement} className="editor" />
      </Slate>
    </NoteEditorStyled>
  );
};

export default NoteEditor;

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return (
    <div
      {...props.attributes}
      style={{
        textAlign: props.element.textAlign,
      }}
    >
      {props.children}
    </div>
  );
};
