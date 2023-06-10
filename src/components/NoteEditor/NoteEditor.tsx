import { TextField } from "@mui/material";
import { NoteEditorToolbar } from "@src/components";
import { Editor } from "slate";
import { Slate } from "slate-react";
import { EditableStyled, NoteEditorStyled } from "./NoteEditor.styled";
import { useNoteEditor } from "./useNoteEditor";

type NoteEditorProps = {
  editor: Editor;
};

export const NoteEditor = (props: NoteEditorProps) => {
  const { editor } = props;
  const { initialValue, renderElement, renderLeaf, title, onTitleChange, onKeyDown } = useNoteEditor(editor);

  return (
    <NoteEditorStyled>
      <TextField variant="standard" fullWidth value={title} onChange={onTitleChange} />
      <NoteEditorToolbar editor={editor} />
      <Slate editor={editor} value={initialValue}>
        <EditableStyled renderLeaf={renderLeaf} renderElement={renderElement} onKeyDown={onKeyDown} />
      </Slate>
    </NoteEditorStyled>
  );
};
