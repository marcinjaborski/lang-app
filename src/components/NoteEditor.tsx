import { Editable, Slate } from "slate-react";
import { NoteEditorStyled } from "../styles/NoteEditor.styled";
import NoteEditorToolbar from "./NoteEditorToolbar";
import { TextField } from "@mui/material";
import { useNoteEditor } from "../hooks/useNoteEditor";
import { Editor } from "slate";

type NoteEditorProps = {
  editor: Editor;
};

const NoteEditor = (props: NoteEditorProps) => {
  const { editor } = props;
  const { initialValue, renderElement, renderLeaf, title, onTitleChange, onKeyDown } = useNoteEditor(editor);

  return (
    <NoteEditorStyled className="note-editor-root">
      <TextField variant="standard" fullWidth value={title} onChange={onTitleChange} />
      <NoteEditorToolbar editor={editor} />
      <Slate editor={editor} value={initialValue}>
        <Editable renderLeaf={renderLeaf} renderElement={renderElement} onKeyDown={onKeyDown} className="editor" />
      </Slate>
    </NoteEditorStyled>
  );
};

export default NoteEditor;
