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
      <TextField fullWidth value={title} variant="standard" onChange={onTitleChange} />
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
          placeholder={t("placeholder")}
          readOnly={readonly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </NoteEditorStyled>
  );
};
