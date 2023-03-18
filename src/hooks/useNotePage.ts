import { useAppDispatch, useAppSelector } from "../redux/store";
import { openDrawer } from "../redux/noteDrawerSlice";
import { useParams } from "react-router-dom";
import { NoteToCreate } from "../util/types";
import pb from "../util/pocketbase";
import { useState } from "react";
import { withReact } from "slate-react";
import { createEditor, Node } from "slate";
import { useMutation, useQueryClient } from "react-query";

export const useNotePage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const onOpenDrawer = () => dispatch(openDrawer());
  const title = useAppSelector((state) => state.noteEditor.title);
  const drawerState = useAppSelector((state) => state.noteDrawer);
  const queryClient = useQueryClient();

  const { mutate: create } = useMutation(
    (note: NoteToCreate) => {
      return pb.collection("notes").create(note);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const { mutate: update } = useMutation(
    ({ id, note }: { id: string; note: NoteToCreate }) => {
      return pb.collection("notes").update(id, note);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const onSave = () => {
    const newNote: NoteToCreate = {
      title,
      content: editor.children.map((n) => Node.string(n)).join(" "),
      owner: pb.authStore.model!.id,
      module: drawerState.module,
      excerpt: drawerState.excerpt,
      baseLang: drawerState.baseLang,
      targetLang: drawerState.targetLang,
    };
    if (params.id) {
      update({ id: params.id, note: newNote });
      return;
    }
    create(newNote);
  };

  return { editor, params, onOpenDrawer, onSave };
};
