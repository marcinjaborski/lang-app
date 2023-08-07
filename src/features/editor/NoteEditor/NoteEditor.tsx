import { Box, TextField } from "@mui/material";
import { CreateTermDialog, HoveringToolbar, Toolbar } from "@src/features/editor";
import { Slate } from "slate-react";
import { EditableStyled, NoteEditorStyled } from "./NoteEditor.styled";
import { useNoteEditor } from "./useNoteEditor";

export const NoteEditor = () => {
  const { editor, t, readonly, emptyElement, renderElement, renderLeaf, title, onTitleChange, onKeyDown } =
    useNoteEditor();

  return (
    <NoteEditorStyled>
      <TextField variant="standard" fullWidth value={title} onChange={onTitleChange} />
      {!readonly ? (
        <>
          <Toolbar />
          <HoveringToolbar />
        </>
      ) : (
        <Box sx={{ p: 1 }} />
      )}
      <CreateTermDialog />
      <Slate editor={editor} value={emptyElement}>
        <EditableStyled
          readOnly={readonly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder={t("placeholder")}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </NoteEditorStyled>
  );
};
