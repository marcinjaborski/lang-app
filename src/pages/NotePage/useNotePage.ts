import { changeTitle, clearState, openDrawer, updateStateFromNote, useAppDispatch, useAppSelector } from "@src/store";
import { Note, NoteToCreate } from "@src/types";
import { pb } from "@src/util";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { createEditor } from "slate";
import { withReact } from "slate-react";

export const useNotePage = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const onOpenDrawer = () => dispatch(openDrawer());
  const title = useAppSelector((state) => state.noteEditor.title);
  const drawerState = useAppSelector((state) => state.noteDrawer);
  const queryClient = useQueryClient();

  const noteQuery = useQuery(
    ["view-note", params.id],
    () => {
      return pb.collection("notes").getOne(params.id!) as Promise<Note>;
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (!params.id) {
      dispatch(changeTitle(""));
      dispatch(clearState());
      return;
    }
    noteQuery.refetch().then(({ data: note }) => {
      if (!note) {
        return;
      }
      editor.children = JSON.parse(note.content);
      dispatch(changeTitle(note.title));
      dispatch(updateStateFromNote(note));
    });
  }, []);

  const { mutate: create } = useMutation(
    (note: NoteToCreate) => {
      return pb.collection("notes").create(note);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const { mutate: update } = useMutation(
    ({ id, note }: { id: string; note: NoteToCreate }) => {
      return pb.collection("notes").update(id, note);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const onSave = () => {
    const newNote: NoteToCreate = {
      title,
      content: JSON.stringify(editor.children),
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
