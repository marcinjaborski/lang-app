import { showSuccess, useAppDispatch } from "@src/store";
import { Note, NoteToCreate, NoteUrlParams } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const useNoteRepository = () => {
  const { t } = useTranslation("feedback");
  const queryClient = useQueryClient();
  const params = useParams<NoteUrlParams>();
  const dispatch = useAppDispatch();

  const view = useQuery(
    ["view-note", params.id],
    () => {
      return pb.collection("notes").getOne(params.id!) as Promise<Note>;
    },
    {
      enabled: false,
    },
  );

  const create = useMutation<Note, pbError, NoteToCreate>(
    (note) => {
      return pb.collection("notes").create({ ...note, owner: pb.authStore.model!.id });
    },
    {
      async onSuccess() {
        dispatch(showSuccess(t("created")));
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const update = useMutation<Note, pbError, { id: string; note: Partial<NoteToCreate> }>(
    ({ id, note }) => {
      return pb.collection("notes").update(id, note);
    },
    {
      async onSuccess() {
        dispatch(showSuccess(t("saved")));
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
        dispatch(showSuccess(t("deleted")));
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  return { view, create, update, delete: deleteMutation };
};
