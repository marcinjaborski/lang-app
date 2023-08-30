import { showSuccess, useAppDispatch } from "@src/store";
import { Note, NoteToCreate, NoteUrlParams, TermElement, UpdateRecord } from "@src/types";
import { pb, PB_CUSTOM_ROUTES, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const useNoteRepository = () => {
  const { t } = useTranslation("feedback");
  const queryClient = useQueryClient();
  const params = useParams<NoteUrlParams>();
  const dispatch = useAppDispatch();

  const listShared = useQuery<Note[], pbError>("list-note-shared", () => {
    return pb.collection("notes").getFullList<Note>({
      filter: `shared~"${pb.authStore.model?.id}"`,
    });
  });

  const view = useQuery<Note, pbError>(
    ["view-note", params.id],
    () => {
      return pb.collection("notes").getOne(params.id!, {
        expand: "shared",
      });
    },
    {
      enabled: false,
    },
  );

  const list = useQuery<Note[], pbError>(["list-notes", params.id], () => {
    return pb.collection("notes").getFullList<Note>();
  });

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

  const update = useMutation<Note, pbError, UpdateRecord<NoteToCreate>>(
    ({ id, record }) => {
      return pb.collection("notes").update(id, record);
    },
    {
      async onSuccess() {
        dispatch(showSuccess(t("saved")));
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const updateTerms = useMutation<void, pbError, TermElement[]>(
    (terms) => {
      return pb.send(`${PB_CUSTOM_ROUTES}/updateNoteTerms`, { method: "POST", body: { note: params.id, terms } });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-terms");
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

  return { listShared, view, list, create, update, updateTerms, delete: deleteMutation };
};
