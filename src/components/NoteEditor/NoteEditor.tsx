import { TextField } from "@mui/material";
import { NoteEditorToolbar } from "@src/components";
import { HoveringToolbar } from "@src/features/editor";
import { Editor } from "slate";
import { Slate } from "slate-react";
import { EditableStyled, NoteEditorStyled } from "./NoteEditor.styled";
import { useNoteEditor } from "./useNoteEditor";

type NoteEditorProps = {
  editor: Editor;
};

export const NoteEditor = (props: NoteEditorProps) => {
  const { editor } = props;
  const { t, emptyElement, renderElement, renderLeaf, title, onTitleChange, onKeyDown } = useNoteEditor(editor);

  return (
    <NoteEditorStyled>
      <TextField variant="standard" fullWidth value={title} onChange={onTitleChange} />
      <NoteEditorToolbar editor={editor} />
      <HoveringToolbar editor={editor} />
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
