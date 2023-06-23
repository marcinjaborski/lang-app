import { TextField } from "@mui/material";
import { HoveringToolbar, Toolbar } from "@src/features/editor";
import { Slate } from "slate-react";
import { EditableStyled, NoteEditorStyled } from "./NoteEditor.styled";
import { useNoteEditor } from "./useNoteEditor";

export const NoteEditor = () => {
  const { editor, t, emptyElement, renderElement, renderLeaf, title, onTitleChange, onKeyDown } = useNoteEditor();

  return (
    <NoteEditorStyled>
      <TextField variant="standard" fullWidth value={title} onChange={onTitleChange} />
      <Toolbar />
      <HoveringToolbar />
      <Slate editor={editor} value={emptyElement}>
        <EditableStyled
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder={t("placeholder")}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </NoteEditorStyled>
  );
};
