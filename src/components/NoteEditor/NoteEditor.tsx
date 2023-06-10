import { TextField } from "@mui/material";
import { NoteEditorToolbar } from "@src/components";
import { Editor } from "slate";
import { Editable, Slate } from "slate-react";
import { NoteEditorStyled } from "./NoteEditor.styled";
import { useNoteEditor } from "./useNoteEditor";

type NoteEditorProps = {
  editor: Editor;
};

export const NoteEditor = (props: NoteEditorProps) => {
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
