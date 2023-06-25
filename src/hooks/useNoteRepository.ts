import { Note, NoteToCreate, NoteUrlParams } from "@src/types";
import { pb } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const useNoteRepository = () => {
  const queryClient = useQueryClient();
  const params = useParams<NoteUrlParams>();

  const view = useQuery(
    ["view-note", params.id],
    () => {
      return pb.collection("notes").getOne(params.id!) as Promise<Note>;
    },
    {
      enabled: false,
    },
  );

  const create = useMutation(
    (note: NoteToCreate) => {
      return pb.collection("notes").create(note);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const update = useMutation(
    ({ id, note }: { id: string; note: NoteToCreate }) => {
      return pb.collection("notes").update(id, note);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const deleteMutation = useMutation(
    (id: string) => {
      return pb.collection("notes").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  return { view, create, update, delete: deleteMutation };
};
