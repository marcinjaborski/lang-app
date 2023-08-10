import { useEditorContext, useTermRepository } from "@src/hooks";
import { useNotePage } from "@src/pages";
import { closeContextMenu, openUpdateTermDialog, useAppDispatch, useAppSelector } from "@src/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Editor, Text, Transforms } from "slate";

export const useContextMenu = () => {
  const { t } = useTranslation("noteEditor");
  const open = useAppSelector((state) => state.noteEditor.contextMenuOpen);
  const termId = useAppSelector((state) => state.noteEditor.contextTermId);
  const contextPosition = useAppSelector((state) => state.noteEditor.contextPosition);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const terms = useTermRepository();
  const dispatch = useAppDispatch();
  const editor = useEditorContext();
  const { onSave: saveNote } = useNotePage();

  const onClose = () => dispatch(closeContextMenu());

  const onUpdate = () => {
    dispatch(openUpdateTermDialog());
  };

  const onDelete = () => {
    terms.delete.mutate(termId, {
      onSuccess() {
        const [selectedTerm] = Editor.nodes(editor, {
          match: (n) => Text.isText(n) && n.type === "term",
        });
        Transforms.setNodes(editor, { type: "text", id: null }, { at: selectedTerm[1] });
        saveNote(editor.children);
      },
    });
    setConfirmDeleteDialogOpen(false);
  };

  return { t, open, contextPosition, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen, onClose, onDelete, onUpdate };
};
